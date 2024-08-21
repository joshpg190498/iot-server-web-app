import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CpuTemperature, Device, RamUsage } from '../interfaces/dashboard.interface';

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

const GET_RAM_USAGE = gql`
  query ramUsage($id_device: String!) {
    ramUsage(id_device: $id_device) {
      id
      id_device
      total_ram
      free_ram
      used_ram
      used_percent_ram
      collected_at_utc
      inserted_at_utc
    }
  }
`;

const GET_CPU_TEMPERATURE = gql`
  query cpuTemperature($id_device: String!) {
    cpuTemperature(id_device: $id_device) {
      id
      id_device
      sensor_key
      temperature
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
      .valueChanges
      .pipe(
        map((result: any) => result.data.dashboardDevices))
  }

  getRamUsage(id_device: string): Observable<RamUsage[]> {
    return this.apollo
      .watchQuery<{ ramUsage: RamUsage[] }>({
        query: GET_RAM_USAGE,
        variables: {
          id_device: id_device
        }
      })
      .valueChanges.pipe(map((result: any) => result.data.ramUsage));
  }

  getCpuTemperature(id_device: string): Observable<CpuTemperature[]> {
    return this.apollo
      .watchQuery<{ cpuTemperature: CpuTemperature[] }>({
        query: GET_CPU_TEMPERATURE,
        variables: {
          id_device: id_device
        }
      })
      .valueChanges.pipe(map((result: any) => result.data.cpuTemperature));
  }
}
