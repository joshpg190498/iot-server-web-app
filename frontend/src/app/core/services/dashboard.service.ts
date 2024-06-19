// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Device } from '../interfaces/dashboard.interface';

const GET_DEVICES_QUERY = gql`
  query dashboardDevices {
    dashboardDevices {
      id
      id_device
      creation_datetime_utc
      update_datetime_utc
      hostname
      processor
      ram
      hostid
      os
      kernel
      collected_at_utc
      inserted_at_utc
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private apollo: Apollo) {}

  getDevices(): Observable<Device[]> {
    return this.apollo
      .watchQuery<{ dashboardDevices: Device[] }>({
        query: GET_DEVICES_QUERY
      })
      .valueChanges.pipe(map((result) => result.data.dashboardDevices));
  }
}
