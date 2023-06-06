import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { DataUtils } from '../utils/dataUtils';

@Injectable({
  providedIn: 'root',
})
export class DriveBCEventsService {
  private dataUtils = new DataUtils();

  public dataId = 'driveBCEvents';
  public label = 'Drive BC Events';
  public labelConstruction = 'Drive BC Events - Construction';
  public labelIncendent = 'Drive BC Events - Incedents';
  public labelSpecialEvents = 'Drive BC Events - Special Events';
  public labelWeaterCondition = 'Drive BC Events - Weather Conditions';
  public dataIdConstruction = 'driveBCEventsConstruction';
  public dataIdIncedent = 'driveBCEventsIncedent';
  public dataIdSpecialEvent = 'driveBCEventsSpecialEvent';
  public dataIdWeatherCondition = 'driveBCEventsWeatherCondition';

  public markerOptionsConstruction: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/construction.png',
  };
  public markerOptionsIncedent: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/warning.png',
  };
  public markerOptionsSpecialEvent: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/specialevent.png',
  };
  public markerOptionsWeatherCondition: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/weather.png',
  };
  public showData = new BehaviorSubject(false);

  public mapDataConstruction = new BehaviorSubject({
    id: this.dataIdConstruction,
    data: [],
    markerPositions: [],
    markerOptions: this.markerOptionsConstruction,
  });
  public mapDataIncedent = new BehaviorSubject({
    id: this.dataIdIncedent,
    data: [],
    markerPositions: [],
    markerOptions: this.markerOptionsIncedent,
  });
  public mapDataSpecialEvent = new BehaviorSubject({
    id: this.dataIdSpecialEvent,
    data: [],
    markerPositions: [],
    markerOptions: this.markerOptionsSpecialEvent,
  });
  public mapDataWeatherCondition = new BehaviorSubject({
    id: this.dataIdWeatherCondition,
    data: [],
    markerPositions: [],
    markerOptions: this.markerOptionsWeatherCondition,
  });

  async getData(mainPolygon, limitSearchBoundary) {
    try {
      const res = await axios({
        method: 'get',
        url: 'https://drivebc.ca/data/events.json',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res?.data) {
        let resultConstruction = [];
        let resultIncident = [];
        let resultSpecialEvent = [];
        let resultWeatherCondition = [];
        for (const item of res.data) {
          const resObj = {
            type: item[0],
            lat: item[1],
            lng: item[2],
            description: item[9],
            raw: item,
          };
          switch (item[0]) {
            case 'CONSTRUCTION':
              resultConstruction.push(resObj);
              break;
            case 'INCIDENT':
              resultIncident.push(resObj);
              break;
            case 'SPECIAL_EVENT':
              resultSpecialEvent.push(resObj);
              break;
            case 'WEATHER_CONDITION':
              resultWeatherCondition.push(resObj);
              break;
            default:
              break;
          }
        }

        // TODO: Make these seperate calls
        this.processDataConstruction(mainPolygon, limitSearchBoundary, resultConstruction);
        this.processDataIncedent(mainPolygon, limitSearchBoundary, resultIncident);
        this.processDataSpecialEvent(mainPolygon, limitSearchBoundary, resultSpecialEvent);
        this.processDataWeatherCondition(mainPolygon, limitSearchBoundary, resultWeatherCondition);
      } else {
        throw res;
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  processDataConstruction(mainPolygon = null, limitSearchBoundary = null, data = []) {
    this.mapDataConstruction.next(
      this.dataUtils.processData(
        mainPolygon,
        limitSearchBoundary,
        data,
        this.createMarkerObject,
        this.dataIdConstruction,
        this.markerOptionsConstruction,
        this.labelConstruction
      )
    );
  }
  processDataIncedent(mainPolygon = null, limitSearchBoundary = null, data = []) {
    this.mapDataIncedent.next(
      this.dataUtils.processData(
        mainPolygon,
        limitSearchBoundary,
        data,
        this.createMarkerObject,
        this.dataIdIncedent,
        this.markerOptionsIncedent,
        this.labelIncendent
      )
    );
  }
  processDataSpecialEvent(mainPolygon = null, limitSearchBoundary = null, data = []) {
    this.mapDataSpecialEvent.next(
      this.dataUtils.processData(
        mainPolygon,
        limitSearchBoundary,
        data,
        this.createMarkerObject,
        this.dataIdSpecialEvent,
        this.markerOptionsSpecialEvent,
        this.labelSpecialEvents
      )
    );
  }
  processDataWeatherCondition(mainPolygon = null, limitSearchBoundary = null, data = []) {
    this.mapDataWeatherCondition.next(
      this.dataUtils.processData(
        mainPolygon,
        limitSearchBoundary,
        data,
        this.createMarkerObject,
        this.dataIdWeatherCondition,
        this.markerOptionsWeatherCondition,
        this.labelWeaterCondition
      )
    );
  }

  createMarkerObject(element) {
    return {
      lat: Number(element.lat),
      lng: Number(element.lng),
      type: element.type,
      description: element.description,
      infoWindow: `<div class="ui header"><strong>${element.type}</strong><br><br>Description: ${element.description}<br><br>Latitude: ${element.lat}<br>Longitude: ${element.lng}<br></div>`,
    };
  }
}
