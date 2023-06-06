import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import * as jsts from 'jsts';
import { GeoUtils } from '../utils/geoUtils';
import { MapDirectionsService } from '@angular/google-maps';

@Injectable({
  providedIn: 'root',
})
export class MapRoutingService {
  private geoUtils = new GeoUtils();
  private parkPolygon;
  private currentEncodedPath; // Array of lat/longs
  private polylineRadius = 2 / 111.12; // roughly 2km

  public directionsResults$ = new BehaviorSubject(undefined);
  public distance = new BehaviorSubject(undefined);
  public duration = new BehaviorSubject(undefined);

  public mainPolygon = new BehaviorSubject(null);

  public selectedOrigin = new BehaviorSubject(null);
  public selectedDestination = new BehaviorSubject(null);
  public selectedPark = new BehaviorSubject(null);

  constructor(private mapDirectionsService: MapDirectionsService) {}

  async renderRoute() {
    const selectedOrigin = this.selectedOrigin.getValue();
    const selectedDestination = this.selectedDestination.getValue();
    if (selectedOrigin && selectedDestination) {
      const request: google.maps.DirectionsRequest = {
        destination: selectedDestination,
        origin: selectedOrigin,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsResults$.next(
        // TODO: Figure out how to do this async so we dont need functionCallback
        this.mapDirectionsService.route(request).pipe(
          map((response) => {
            try {
              this.distance.next(response.result?.routes[0].legs[0].distance.text);
              this.duration.next(response.result?.routes[0].legs[0].duration.text);
            } catch (e) {
              // Fall through.
            }
            this.currentEncodedPath = response.result.routes[0].overview_path;
            // this.currentEncodedPolyline = response.result.routes[0].overview_polyline;
            this.createPolygon();
            return response.result;
          })
        )
      );
      this.calculateParkPolygon();
    }
  }

  createPolygon() {
    if (this.currentEncodedPath) {
      let overviewPathGeo = this.geoUtils.decodePath(this.currentEncodedPath);
      let radius = this.polylineRadius;
      let geoInput: any = {
        type: 'LineString',
        coordinates: overviewPathGeo,
      };
      geoInput = this.geoUtils.googleMaps2JTS(this.currentEncodedPath);
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
      this.mainPolygon.next(oLatLng);
    }
  }

  calculateParkPolygon() {
    const selectedPark = this.selectedPark.getValue();
    if (selectedPark) {
      let parkPolygonArray = this.geoUtils.createPolygonFromGeoJSON(selectedPark.orcs);
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

  setSelectedOrigin(lat, lng, triggerRender = false) {
    this.selectedOrigin.next({
      lat: lat,
      lng: lng,
    });
    if (triggerRender) {
      this.renderRoute();
    }
  }

  setSelectedDestination(lat, lng, triggerRender = false) {
    this.selectedDestination.next({
      lat: lat,
      lng: lng,
    });
    if (triggerRender) {
      this.renderRoute();
    }
  }

  setSelectedPark(park) {
    this.selectedPark.next(park);
  }
}
