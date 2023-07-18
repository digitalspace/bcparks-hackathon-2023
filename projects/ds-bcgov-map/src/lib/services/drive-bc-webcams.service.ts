import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { DataUtils } from '../utils/dataUtils';

@Injectable({
  providedIn: 'root',
})
export class DriveBCWebcamsService {
  private dataUtils = new DataUtils();

  public dataId = 'driveBCWebcam';
  public label = 'Highway Webcams';
  public markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/images/webcam.png',
  };
  public mapData = new BehaviorSubject({
    id: this.dataId,
    data: [],
    markerPositions: [],
    markerOptions: this.markerOptions,
  });
  public showData = new BehaviorSubject(false);

  async getData(mainPolygon, limitSearchBoundary) {
    try {
      const res = await axios({
        method: 'get',
        url: 'https://drivebc.ca/data/webcams.json',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res?.data) {
        let resultObj = [];
        for (const item of res.data) {
          resultObj.push({
            id: item[0],
            name: item[1],
            description: item[2],
            lat: item[5],
            lng: item[6],
            raw: item,
          });
        }
        this.processData(mainPolygon, limitSearchBoundary, resultObj);
      } else {
        throw res;
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  processData(mainPolygon = null, limitSearchBoundary = null, data = []) {
    this.mapData.next(
      this.dataUtils.processData(
        mainPolygon,
        limitSearchBoundary,
        data,
        this.createMarkerObject,
        this.dataId,
        this.markerOptions,
        this.label
      )
    );
  }

  createMarkerObject(element) {
    const label = 'Webcam';
    const camlink = `https://images.drivebc.ca/bchighwaycam/pub/cameras/tn/${element.id}.jpg`;
    const drivebclink = `https://images.drivebc.ca/bchighwaycam/pub/html/dbc/${element.id}.html`;
    return {
      lat: Number(element.lat),
      lng: Number(element.lng),
      name: element.name,
      description: element.description,
      infoWindow: `<div class="ui header"><strong>${label}</strong><br><br>Name: ${element.name}<br>Description: ${element.description}<br><br>Latitude: ${element.lat}<br>Longitude: ${element.lng}<br><br><a target="_blank" href="${drivebclink}"><img src="${camlink}"></a></div>`,
    };
  }
}
