import { Injectable } from '@angular/core';
import axios from 'axios';
import { DataUtils } from '../utils/dataUtils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WildfireService {
  private dataUtils = new DataUtils();

  public dataId = 'wf';
  public label = 'Wildfires';
  public labelOOC = 'Wildfires - Out of Control';
  public labelHeld = 'Wildfires - Held';
  public labelUnderControl = 'Wildfires - Under Control';
  public dataIdOOC = 'wfOOC';
  public dataIdHeld = 'wfHeld';
  public dataIdUnderControl = 'wfUnderControl';

  public markerOptionsOOC: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/wildfire-outofcontrol.png',
  };
  public markerOptionsHeld: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/wildfire-held.png',
  };
  public markerOptionsUnderControl: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/wildfire-undercontrol.png',
  };
  public showData = new BehaviorSubject(false);

  public mapDataOOC = new BehaviorSubject({
    id: this.dataIdOOC,
    data: [],
    markerPositions: [],
    markerOptions: this.markerOptionsOOC,
  });
  public mapDataHeld = new BehaviorSubject({
    id: this.dataIdHeld,
    data: [],
    markerPositions: [],
    markerOptions: this.markerOptionsHeld,
  });
  public mapDataUnderControl = new BehaviorSubject({
    id: this.dataIdUnderControl,
    data: [],
    markerPositions: [],
    markerOptions: this.markerOptionsUnderControl,
  });

  async getData(mainPolygon, limitSearchBoundary) {
    try {
      const res = await axios({
        method: 'get',
        url: 'https://wildfiresituation-api.nrs.gov.bc.ca/publicPublishedIncident?fireOfNote=false&out=false&stageOfControlList=OUT_CNTRL&stageOfControlList=HOLDING&stageOfControlList=UNDR_CNTRL',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let resultOOC = [];
      let resultHeld = [];
      let resultUnderControl = [];
      if (res?.data?.collection) {
        for (let item of res.data.collection) {
          item.lat = item.latitude;
          item.lng = item.longitude;
          switch (item.stageOfControlCode) {
            case 'OUT_CNTRL':
              resultOOC.push(item);
              break;
            case 'UNDR_CNTRL':
              resultHeld.push(item);
              break;
            case 'HOLDING':
              resultUnderControl.push(item);
              break;
            default:
              break;
          }
        }

        // TODO: Make these seperate calls
        this.processDataOOC(mainPolygon, limitSearchBoundary, resultOOC);
        this.processDataHeld(mainPolygon, limitSearchBoundary, resultHeld);
        this.processDataUnderControl(mainPolygon, limitSearchBoundary, resultUnderControl);
      } else {
        throw res;
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  processDataOOC(mainPolygon = null, limitSearchBoundary = null, data = []) {
    this.mapDataOOC.next(
      this.dataUtils.processData(
        mainPolygon,
        limitSearchBoundary,
        data,
        this.createMarkerObject,
        this.dataIdOOC,
        this.markerOptionsOOC,
        this.labelOOC
      )
    );
  }
  processDataHeld(mainPolygon = null, limitSearchBoundary = null, data = []) {
    this.mapDataHeld.next(
      this.dataUtils.processData(
        mainPolygon,
        limitSearchBoundary,
        data,
        this.createMarkerObject,
        this.dataIdHeld,
        this.markerOptionsHeld,
        this.labelHeld
      )
    );
  }
  processDataUnderControl(mainPolygon = null, limitSearchBoundary = null, data = []) {
    this.mapDataUnderControl.next(
      this.dataUtils.processData(
        mainPolygon,
        limitSearchBoundary,
        data,
        this.createMarkerObject,
        this.dataIdUnderControl,
        this.markerOptionsUnderControl,
        this.labelUnderControl
      )
    );
  }

  createMarkerObject(element) {
    let label = '';
    switch (element.stageOfControlCode) {
      case 'OUT_CNTRL':
        label = 'Out of Control';
        break;
      case 'UNDR_CNTRL':
        label = 'Under Control';
        break;
      case 'HOLDING':
        label = 'Holding';
        break;
      default:
        break;
    }

    return {
      lat: Number(element.lat),
      lng: Number(element.lng),
      type: element.type,
      description: element.description,
      infoWindow: `<div class="ui header"><strong>${label}</strong><br><br>Latitude: ${element.lat}<br>Longitude: ${element.lng}<br><br>Incident name: ${element.incidentName}<br><br>Location: ${element.incidentLocation}<br>${element.fireCentreInfo}<br></div>`,
    };
  }
}
