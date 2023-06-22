import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MapDirectionsService, MapInfoWindow } from '@angular/google-maps';
import { Observable, map, catchError, of } from 'rxjs';
import { GeoUtils } from './geoUtils';
import { ParkConstants } from './park-constants';
import * as jsts from 'jsts';
import { WildfireService } from '../services/wildfire.service';
import { DayuseService } from '../services/dayuse.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { DriveBCService } from '../services/drivebc.service';

// CHANGEME = your google api key for the places api
const GOOGLEAPIKEY = 'https://maps.googleapis.com/maps/api/js?key=CHANGEME&libraries=places';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MapComponent {
  @ViewChild('addresstext') addresstext: any;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  private keyBuffer = [];
  private konami = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];
  easterEgg = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.processKeyPress(event.key);
  }

  processKeyPress(key) {
    if (key === 'Enter') {
      if (this.keyBuffer.toString() === this.konami.toString()) {
        // Do Konami things
        this.easterEgg = true;
      }
    } else {
      if (this.keyBuffer.length > 9) {
        this.keyBuffer.shift();
      }
      this.keyBuffer.push(key);
    }
  }

  apiLoaded: Observable<boolean>;

  public geoUtils = new GeoUtils();

  public directionsResults$: Observable<
    google.maps.DirectionsResult | undefined
  >;

  public currentEncodedPath; // Array of lat/longs
  public currentEncodedPolyline; // encoded polyline path
  public decodedPath;
  public polylineRadius = 2 / 111.12; // roughly 2km
  public routePolygon;
  public parkPolygon;
  public mainPolygon;
  public showBoundary = false;
  public limitSearchBoundary = true;

  options: google.maps.MapOptions = {
    center: { lat: 50, lng: -123.1207 },
    zoom: 7,
  };

  autocompleteInput: string;
  addressTypes = ['geocode', 'establishment'];

  distance;
  duration;

  selectedPark = null;

  selectedDestination = null;
  selectedOrigin = null;

  parks = ParkConstants.parks;

  // WF
  wfData = null;
  wfChecked = false;
  wfMarkerOptionsOutOfControl: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/wildfire-outofcontrol.png',
  };
  wfMarkerOptionsExtinguished: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/wildfire-extinguished.png',
  };
  wfMarkerOptionsHeld: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/wildfire-held.png',
  };
  wfMarkerOptionsNote: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/wildfire-ofnote.png',
  };
  wfMarkerOptionUnderControl: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/wildfire-undercontrol.png',
  };
  wfMarkerPositions: google.maps.LatLngLiteral[] = [];
  public wfMarkerPositionsOutOfControl: google.maps.LatLngLiteral[] = [];
  public wfMarkerPositionsUnderControl: google.maps.LatLngLiteral[] = [];
  public wfMarkerPositionsHolding: google.maps.LatLngLiteral[] = [];

  // Day use
  dayUseData = null;

  // Drive BC
  driveData = null;
  driveChecked = false;
  driveMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/construction.png',
  };
  driveMarkerOptionsIncident: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/warning.png',
  };
  driveMarkerOptionsWeather: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/weather.png',
  };
  driveMarkerOptionsSpecialEvent: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/specialevent.png',
  };
  driveMarkerPositions: google.maps.LatLngLiteral[] = [];
  driveMarkerPositionsIncident: google.maps.LatLngLiteral[] = [];
  driveMarkerPositionsWeather: google.maps.LatLngLiteral[] = [];
  driveMarkerPositionsSpecialEvent: google.maps.LatLngLiteral[] = [];

  // Web cams
  webcamData = null;
  webcamChecked = false;
  webcamMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/webcam.png',
  };
  webcamMarkerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    protected httpClient: HttpClient,
    protected mapDirectionsService: MapDirectionsService,
    protected wildfireService: WildfireService,
    protected driveBCService: DriveBCService,
    protected dayuseService: DayuseService
  ) {
    this.apiLoaded = httpClient
      .jsonp(
        GOOGLEAPIKEY,
        'callback'
      )
      .pipe(
        map(() => {
          this.getPlaceAutocomplete();
          return true;
        }),
        catchError(() => of(false))
      );
  }

  openInfoWindow(marker, index, type) {
    let content;
    let label;
    let theContent;
    if (type === 'ooc') {
      content = this.wfMarkerPositionsOutOfControl[index];
      label = 'Out of Control';
      theContent = `<div class="ui header"><strong>${label}</strong><br><br>Latitude: ${content.lat}<br>Longitude: ${content.lng}<br><br>Incident name: ${content.incidentName}<br><br>Location: ${content.incidentLocation}<br>${content.fireCentreInfo}<br></div>`;
    } else if (type === 'under') {
      content = this.wfMarkerPositionsUnderControl[index];
      label = 'Under Control';
      theContent = `<div class="ui header"><strong>${label}</strong><br><br>Latitude: ${content.lat}<br>Longitude: ${content.lng}<br><br>Incident name: ${content.incidentName}<br><br>Location: ${content.incidentLocation}<br>${content.fireCentreInfo}<br></div>`;
    } else if (type === 'holding') {
      content = this.wfMarkerPositionsHolding[index];
      label = 'Holding';
      theContent = `<div class="ui header"><strong>${label}</strong><br><br>Latitude: ${content.lat}<br>Longitude: ${content.lng}<br><br>Incident name: ${content.incidentName}<br><br>Location: ${content.incidentLocation}<br>${content.fireCentreInfo}<br></div>`;
    } else if (type === 'drive') {
      content = this.driveMarkerPositions[index];
      label = `${content.type}`;
      theContent = `<div class="ui header"><strong>${label}</strong><br><br>Description: ${content.description}<br><br>Latitude: ${content.lat}<br>Longitude: ${content.lng}<br></div>`;
    } else if (type === 'driveincident') {
      content = this.driveMarkerPositionsIncident[index];
      label = `${content.type}`;
      theContent = `<div class="ui header"><strong>${label}</strong><br><br>Description: ${content.description}<br><br>Latitude: ${content.lat}<br>Longitude: ${content.lng}<br></div>`;
    } else if (type === 'weather') {
      content = this.driveMarkerPositionsWeather[index];
      label = `${content.type}`;
      theContent = `<div class="ui header"><strong>${label}</strong><br><br>Description: ${content.description}<br><br>Latitude: ${content.lat}<br>Longitude: ${content.lng}<br></div>`;
    } else if (type === 'specialevent') {
      content = this.driveMarkerPositionsSpecialEvent[index];
      label = `${content.type}`;
      theContent = `<div class="ui header"><strong>${label}</strong><br><br>Description: ${content.description}<br><br>Latitude: ${content.lat}<br>Longitude: ${content.lng}<br></div>`;
    } else if (type === 'webcam') {
      content = this.webcamMarkerPositions[index];
      label = 'Webcam';
      let camlink = `https://images.drivebc.ca/bchighwaycam/pub/cameras/tn/${content.id}.jpg`;
      let drivebclink = `https://images.drivebc.ca/bchighwaycam/pub/html/dbc/${content.id}.html`;
      theContent = `<div class="ui header"><strong>${label}</strong><br><br>Name: ${content.name}<br>Description: ${content.description}<br><br>Latitude: ${content.lat}<br>Longitude: ${content.lng}<br><br><a target="_blank" href="${drivebclink}"><img src="${camlink}"></a></div>`;
    }

    this.infoWindow.infoWindow.setContent(theContent);
    this.infoWindow.open(marker);
  }

  filterWFByType(type) {
    switch (type) {
      case 'outofcontrol':
        return this.wfMarkerOptionsOutOfControl;
      case 'extinguished':
        return this.wfMarkerOptionsExtinguished;
      case 'held':
        return this.wfMarkerOptionsHeld;
      case 'ofnote':
        return this.wfMarkerOptionsNote;
      case 'undercontrol':
        return this.wfMarkerOptionUnderControl;
      case 'incident':
        return this.driveMarkerOptionsIncident;
      case 'weather':
        return this.driveMarkerOptionsWeather;
      case 'specialevent':
        return this.driveMarkerOptionsSpecialEvent;
    }
    return this.wfMarkerOptionsNote;
  }

  async renderRoute(destination, origin) {
    // TODO: pass in destination & origin
    // This must await apiLoaded
    const request: google.maps.DirectionsRequest = {
      destination: destination,
      origin: origin,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(
      map((response) => {
        try {
          this.distance = response.result?.routes[0].legs[0].distance.text;
          this.duration = response.result?.routes[0].legs[0].duration.text;
        } catch (e) {
          // Fall throught.
        }
        this.currentEncodedPath = response.result.routes[0].overview_path;
        this.currentEncodedPolyline =
          response.result.routes[0].overview_polyline;
        this.createPolygon();
        this.fetchData();
        return response.result;
      })
    );
    this.calculateParkPolygon();
  }

  async fetchData() {
    // Get DUP info
    await this.getDayUseData();

    // Get wildfire data
    await this.getWFData();

    // Get drive BC data
    await this.getDriveData();

    // Get webcam data
    await this.getWebcamData();
  }

  calculateParkPolygon() {
    if (this.selectedPark) {
      let parkPolygonArray = this.geoUtils.createPolygonFromGeoJSON(
        this.selectedPark.orcs
      );
      let union;
      for (const test of parkPolygonArray) {
        let poly = this.geoUtils.createJSTSPoly(test);
        if (!union) {
          union = poly;
        } else {
          union = union.union(poly);
        }
        this.parkPolygon = union;
      }
    }
  }

  private getPlaceAutocomplete() {
    try {
      const autocomplete = new google.maps.places.Autocomplete(
        this.addresstext.nativeElement,
        {
          componentRestrictions: { country: 'CA' },
          types: ['geocode'], // 'establishment' / 'address' / 'geocode'
        }
      );
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.autocompleteEvent(place);
      });
    } catch (error) {
      console.log(error);
    }
  }

  googleMaps2JTS(boundaries) {
    var coordinates: any[] = [];
    var length = 0;
    if (boundaries && boundaries.getLength) length = boundaries.getLength();
    else if (boundaries && boundaries.length) length = boundaries.length;
    for (var i = 0; i < length; i++) {
      if (boundaries.getLength)
        coordinates.push(
          new jsts.geom.Coordinate(
            boundaries.getAt(i).lat(),
            boundaries.getAt(i).lng()
          )
        );
      else if (boundaries.length)
        coordinates.push(
          new jsts.geom.Coordinate(boundaries[i].lat(), boundaries[i].lng())
        );
    }
    return coordinates;
  }

  jsts2googleMaps = function (geometry) {
    let coordArray = geometry.getCoordinates();
    let GMcoords: any[] = [];
    for (const item of coordArray) {
      GMcoords.push(new google.maps.LatLng(item.x, item.y));
    }
    return GMcoords;
  };

  createPolygon() {
    if (this.currentEncodedPath) {
      let overviewPathGeo = this.decodePath(this.currentEncodedPath);
      let radius = this.polylineRadius;
      let geoInput: any = {
        type: 'LineString',
        coordinates: overviewPathGeo,
      };
      geoInput = this.googleMaps2JTS(this.currentEncodedPath);
      let geometryFactory = new jsts.geom.GeometryFactory();
      let shell = geometryFactory.createLineString(geoInput);
      let polygon = shell.buffer(radius);
      let mergedPolygon;
      if (this.parkPolygon) {
        mergedPolygon = this.parkPolygon.union(polygon);
      }

      let oLatLng: google.maps.LatLngLiteral[] = [];
      let oCoordinates = mergedPolygon?._shell._points._coordinates;
      for (const coord of oCoordinates) {
        oLatLng.push({ lat: coord.x, lng: coord.y });
      }
      this.mainPolygon = oLatLng;
    }
  }

  decodePath(encodedPath) {
    let path: google.maps.LatLngLiteral[] = [];
    for (const point of encodedPath) {
      path.push({
        lat: point.lat(),
        lng: point.lng(),
      });
    }
    return path;
  }

  autocompleteEvent(place: any) {
    this.selectedOrigin = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    if (this.selectedDestination) {
      this.renderRoute(this.selectedDestination, this.selectedOrigin);
    }
  }

  async parkSelectEvent(park) {
    this.selectedPark = park;
    this.selectedDestination = {
      lat: park.lat,
      lng: park.lng,
    };

    if (this.selectedOrigin) {
      this.renderRoute(this.selectedDestination, this.selectedOrigin);
    }
  }

  showBoundaryChange() {
    this.showBoundary = !this.showBoundary;
    this.calculateParkPolygon();
    this.createPolygon();
  }

  addMarkers(cordsArray) {
    if (!cordsArray || cordsArray.length === 0) return [];
    let markerPositions = [];
    cordsArray.forEach((element) => {
      let fcname = element.fireCentreName;
      if (element.fireCentreCode) {
        fcname += ` (${element.fireCentreCode})`;
      }
      markerPositions.push({
        lat: Number(element.latitude),
        lng: Number(element.longitude),
        incidentName: element.incidentName,
        fireCentreInfo: fcname,
        fireCentreCode: element.fireCentreCode,
        incidentLocation: element.incidentLocation,
        crewStatusDescription: element.crewStatusDescription,
        description: element.description,
        municipality: element.municipality,
        type: element.type,
        cause: element.cause,
        area: element.area,
        id: element.id,
        name: element.name,
      });
    });
    return markerPositions;
  }

  async getDayUseData() {
    this.dayUseData = null;

    if (this.mainPolygon) {
      this.dayUseData = await this.dayuseService.getDUPParks(
        this.selectedPark.orcs
      );
    }
  }

  async getWFData() {
    this.wfData = null;

    let ooc = [];
    let underc = [];
    let holding = [];
    this.wfMarkerPositions = [];
    this.wfMarkerPositionsUnderControl = [];
    this.wfMarkerPositionsOutOfControl = [];
    this.wfMarkerPositionsHolding = [];
    if (this.wfChecked) {
      await this.wildfireService.getData();
      if (this.mainPolygon && this.limitSearchBoundary) {
        // Do fetches with limiter
        this.wfData = this.wildfireService.getFilteredData(this.mainPolygon);
      } else if (!this.limitSearchBoundary) {
        // Get all
        this.wfData = this.wildfireService.data;
      }
      this.wfMarkerPositions = this.addMarkers(this.wfData);

      if (this.wfData) {
        for (const thing of this.wfData) {
          if (thing.stageOfControlCode === 'OUT_CNTRL') {
            ooc.push(thing);
          } else if (thing.stageOfControlCode === 'UNDR_CNTRL') {
            underc.push(thing);
          } else if (thing.stageOfControlCode === 'HOLDING') {
            holding.push(thing);
          }
        }
        this.wfMarkerPositionsUnderControl = this.addMarkers(underc);
        this.wfMarkerPositionsOutOfControl = this.addMarkers(ooc);
        this.wfMarkerPositionsHolding = this.addMarkers(holding);
      }
    }
  }

  async getDriveData() {
    this.driveData = null;

    let normal = [];
    let incident = [];
    let specialevent = [];
    let weather = [];
    this.driveMarkerPositions = [];
    this.driveMarkerPositionsIncident = [];
    this.driveMarkerPositionsWeather = [];
    this.driveMarkerPositionsSpecialEvent = [];
    if (this.driveChecked) {
      await this.driveBCService.getData();
      if (this.mainPolygon && this.limitSearchBoundary) {
        // Do fetches with limiter
        this.driveData = this.driveBCService.getFilteredData(this.mainPolygon);
      } else if (!this.limitSearchBoundary) {
        // Get all
        this.driveData = this.driveBCService.data;
      }

      if (this.driveData) {
        for (const thing of this.driveData) {
          if (thing.type === 'CONSTRUCTION') {
            normal.push(thing);
          } else if (thing.type === 'INCIDENT') {
            incident.push(thing);
          } else if (thing.type === 'SPECIAL_EVENT') {
            specialevent.push(thing);
          } else if (thing.type === 'WEATHER_CONDITION') {
            weather.push(thing);
          }
        }
        this.driveMarkerPositions = this.addMarkers(normal);
        this.driveMarkerPositionsIncident = this.addMarkers(incident);
        this.driveMarkerPositionsWeather = this.addMarkers(weather);
        this.driveMarkerPositionsSpecialEvent = this.addMarkers(specialevent);
      }
    }
  }

  async getWebcamData() {
    this.webcamData = null;
    this.webcamMarkerPositions = [];

    if (this.webcamChecked) {
      await this.driveBCService.getWebcamJson();
      if (this.mainPolygon && this.limitSearchBoundary) {
        // Do fetches with limiter
        this.webcamData = this.driveBCService.getFilteredWebcamData(
          this.mainPolygon
        );
      } else if (!this.limitSearchBoundary) {
        // Get all
        this.webcamData = this.driveBCService.webcamdata;
      }
      this.webcamMarkerPositions = this.addMarkers(this.webcamData);
    }
  }
}
