import { Injectable } from '@angular/core';
import axios from 'axios';
import { GeoUtils } from '../map/geoUtils';
import { assertLatLngIsValid } from 'geohashing/lib/helpers';

@Injectable({
  providedIn: 'root',
})
export class DriveBCService {
  constructor() {}
  private geoUtils = new GeoUtils();
  public data = [];
  public webcamdata = [];

  async getData() {
    try {
      const res = await axios({
        method: 'get',
        url: 'https://drivebc.ca/data/events.json',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res?.data) {
        let resultObj = [];
        for (const item of res.data) {
          resultObj.push({
            type: item[0],
            latitude: item[1],
            longitude: item[2],
            description: item[9],
            raw: item,
          });
        }
        this.data = resultObj;
        return resultObj;
      } else {
        throw res;
      }
    } catch (error) {
      console.log('Error:', error);
      return error;
    }
  }

  async getWebcamJson() {
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
            latitude: item[5],
            longitude: item[6],
            raw: item,
          });
        }
        this.webcamdata = resultObj;
        return resultObj;
      } else {
        throw res;
      }
    } catch (error) {
      console.log('Error:', error);
      return error;
    }
  }

  getFilteredData(poly) {
    let filteredData = [];
    for (const item of this.data) {
      const lat = item.latitude;
      const lng = item.longitude;
      if (this.geoUtils.checkIfLatLngIntersects(lng, lat, poly)) {
        filteredData.push(item);
      }
    }
    return filteredData;
  }

  getFilteredWebcamData(poly) {
    let filteredData = [];
    for (const item of this.webcamdata) {
      const lat = item.latitude;
      const lng = item.longitude;
      if (this.geoUtils.checkIfLatLngIntersects(lng, lat, poly)) {
        filteredData.push(item);
      }
    }
    return filteredData;
  }
}
