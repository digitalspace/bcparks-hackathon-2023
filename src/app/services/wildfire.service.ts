import { Injectable } from '@angular/core';
import axios from 'axios';
import { GeoUtils } from '../map/geoUtils';

@Injectable({
  providedIn: 'root',
})
export class WildfireService {
  constructor() {}
  private geoUtils = new GeoUtils();
  public data = [];

  async getData() {
    try {
      const wfRes = await axios({
        method: 'get',
        url: 'https://wildfiresituation-api.nrs.gov.bc.ca/publicPublishedIncident?fireOfNote=false&out=false&stageOfControlList=OUT_CNTRL&stageOfControlList=HOLDING&stageOfControlList=UNDR_CNTRL',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (wfRes?.data?.collection) {
        this.data = wfRes.data.collection;
        return wfRes.data.collection;
      } else {
        throw wfRes;
      }
    } catch (error) {
      console.log('Error:', error);
      return error;
    }
  }

  getFilteredData(poly) {
    let filteredData = [];
    for (const item of this.data) {
      const lat = Number(item.latitude);
      const lng = Number(item.longitude);
      if (this.geoUtils.checkIfLatLngIntersects(lng, lat, poly)) {
        filteredData.push(item);
      }
    }

    return filteredData;
  }
}
