import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DayuseService {
  public data = new BehaviorSubject(null);

  constructor() {}

  async getDUPParks(orcs) {
    try {
      let res = null;

      const dupParkRes = await axios({
        method: 'get',
        url: `https://jd7n1axqh0.execute-api.ca-central-1.amazonaws.com/api/park?park=${orcs}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      res = dupParkRes.data[0];

      const dupFacilityRes = await axios({
        method: 'get',
        url: `https://jd7n1axqh0.execute-api.ca-central-1.amazonaws.com/api/facility?park=${orcs}&facilities=true`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      res['facilities'] = dupFacilityRes.data;

      for (let i = 0; i < res.facilities.length; i++) {
        const facility = res.facilities[i];

        const dupReservationsRes = await axios({
          method: 'get',
          url: `https://jd7n1axqh0.execute-api.ca-central-1.amazonaws.com/api/reservation?facility=${facility.name}&park=${orcs}`,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        res.facilities[i]['reservations'] = dupReservationsRes.data;
      }
      this.data.next(res);
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
