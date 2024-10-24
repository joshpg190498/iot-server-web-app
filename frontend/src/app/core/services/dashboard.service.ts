import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CpuTemperature, CpuUsage, DashboardDeviceDataRT, Device, DiskUsage, LoadAverage, NetworkStats, RamUsage } from '../interfaces/dashboard.interface';

const ramUsageFields = `
  id
  id_device
  total_ram
  free_ram
  used_ram
  used_percent_ram
  collected_at_utc
  inserted_at_utc
`

const cpuTemperatureFields = `
  id
  id_device
  sensor_key
  temperature
  collected_at_utc
  inserted_at_utc
`

const cpuUsageFields = `
  id
  id_device
  cpu_usage
  collected_at_utc
  inserted_at_utc
`

const diskUsageFields = `
  id
  id_device
  disk_name
  total_disk
  free_disk
  used_disk
  used_percent_disk
  collected_at_utc
  inserted_at_utc
`

const loadAverageFields = `
  id
  id_device
  load_average_1m
  load_average_5m
  load_average_15m
  collected_at_utc
  inserted_at_utc
`

const networkStatsFields = `
  id
  id_device
  interface_name
  bytes_sent
  bytes_recv
  packets_sent
  packets_recv
  errout
  errin
  dropin
  dropout
  collected_at_utc
  inserted_at_utc
`


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
      cpu_count
      collected_at_utc
      inserted_at_utc
    }
  }
`

const GET_RAM_USAGE = gql`
  query ramUsage($id_device: String!) {
    ramUsage(id_device: $id_device) {
      ${ramUsageFields}
    }
  }
`

const GET_CPU_TEMPERATURE = gql`
  query cpuTemperature($id_device: String!) {
    cpuTemperature(id_device: $id_device) {
      ${cpuTemperatureFields}
    }
  }
`

const GET_CPU_USAGE = gql`
  query cpuUsage($id_device: String!) {
    cpuUsage(id_device: $id_device) {
      ${cpuUsageFields}
    }
  }
`

const GET_DISK_USAGE = gql`
  query diskUsage($id_device: String!) {
    diskUsage(id_device: $id_device) {
      ${diskUsageFields}
    }
  }
`

const GET_LOAD_AVERAGE = gql`
  query loadAverage($id_device: String!) {
    loadAverage(id_device: $id_device) {
      ${loadAverageFields}
    }
  }
`

const GET_NETWORK_STATS = gql`
  query networkStats($id_device: String!) {
    networkStats(id_device: $id_device) {
      ${networkStatsFields}
    }
  }
`

const GET_DASHBOARD_DEVICE_DATA = gql`
query dashboardDeviceDataRT($id_device: String!) {
  dashboardDeviceDataRT(id_device: $id_device) {
    ramUsage {
      ${ramUsageFields}
    }
    cpuTemperature {
      ${cpuTemperatureFields}
    }
    cpuUsage {
      ${cpuUsageFields}
    }
    diskUsage {
      ${diskUsageFields}
    }
    loadAverage {
      ${loadAverageFields}
    }
    networkStats {
      ${networkStatsFields}
    }
  }
}
`


const NEW_DEVICE_DATA_SUBSCRIPTION = gql`
  subscription newDeviceData($id_device: String!) {
    newDeviceData(id_device: $id_device) {
      id_device
      parameter
      data
      collected_at_utc
    }
  }
`



@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private ramDataSubject = new BehaviorSubject<RamUsage[]>([])
  private cpuTempDataSubject = new BehaviorSubject<CpuTemperature[]>([])
  private cpuUsageDataSubject = new BehaviorSubject<CpuUsage[]>([])
  private diskUsageDataSubject = new BehaviorSubject<DiskUsage[]>([])
  private loadAverageDataSubject = new BehaviorSubject<LoadAverage[]>([])
  private networkStatsDataSubject = new BehaviorSubject<NetworkStats[]>([])

  private updateData: { [key in any]: (data: any) => void } = {
    'ram': (data: any) => {
      const currentData = this.ramDataSubject.getValue()
      this.ramDataSubject.next([...currentData, ...data].slice(-100))
    },
    'cpu_temp': (data: any) => {
      const currentData = this.cpuTempDataSubject.getValue()
      this.cpuTempDataSubject.next([...currentData, ...data].slice(-100))
      console.log(this.cpuTempDataSubject.getValue())
    },
    'cpu_usage': (data: any) => {
      const currentData = this.cpuUsageDataSubject.getValue()
      this.cpuUsageDataSubject.next([...currentData, ...data].slice(-100))
    },
    'disk': (data: any) => {
      const currentData = this.diskUsageDataSubject.getValue()
      this.diskUsageDataSubject.next([...currentData, ...data].slice(-100))
    },
    'load_average': (data: any) => {
      const currentData = this.loadAverageDataSubject.getValue()
      this.loadAverageDataSubject.next([...currentData, ...data].slice(-100))
    },
    'network_stats': (data: any) => {
      const currentData = this.networkStatsDataSubject.getValue()
      this.networkStatsDataSubject.next([...currentData, ...data].slice(-100))
    }
  }

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

  getRamUsageRT(id_device: string): Observable<RamUsage[]> {
    return this.apollo
      .watchQuery<{ ramUsage: RamUsage[] }>({
        query: GET_RAM_USAGE,
        variables: {
          id_device: id_device
        }
      })
      .valueChanges.pipe(map((result: any) => {
        const data = result.data.ramUsage.slice(0, 100)
        data.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
        this.ramDataSubject.next(data)
        return data
      }));
  }

  getCpuTemperatureRT(id_device: string): Observable<CpuTemperature[]> {
    return this.apollo
      .watchQuery<{ cpuTemperature: CpuTemperature[] }>({
        query: GET_CPU_TEMPERATURE,
        variables: {
          id_device: id_device
        }
      })
      .valueChanges.pipe(map((result: any) => {
        const data = result.data.cpuTemperature.slice(0, 100)
        data.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
        this.cpuTempDataSubject.next(data)
        return data
      }));
  }

  getCpuUsageRT(id_device: string): Observable<CpuUsage[]> {
    return this.apollo
      .watchQuery<{ cpuUsage: CpuUsage[] }>({
        query: GET_CPU_USAGE,
        variables: {
          id_device: id_device
        }
      })
      .valueChanges.pipe(map((result: any) => {
        const data = result.data.cpuUsage.slice(0, 100)
        data.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
        this.cpuUsageDataSubject.next(data)
        return data
      }));
  }

  getDiskUsageRT(id_device: string): Observable<DiskUsage[]> {
    return this.apollo
      .watchQuery<{ diskUsage: DiskUsage[] }>({
        query: GET_DISK_USAGE,
        variables: {
          id_device: id_device
        }
      })
      .valueChanges.pipe(map((result: any) => {
        const data = result.data.diskUsage.slice(0, 100)
        data.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
        this.diskUsageDataSubject.next(data)
        return data
      }));
  }

  getLoadAverageRT(id_device: string): Observable<LoadAverage[]> {
    return this.apollo
      .watchQuery<{ loadAverage: LoadAverage[] }>({
        query: GET_LOAD_AVERAGE,
        variables: {
          id_device: id_device
        }
      })
      .valueChanges.pipe(map((result: any) => {
        const data = result.data.loadAverage.slice(0, 100)
        data.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
        this.loadAverageDataSubject.next(data)
        return data
      }));
  }

  getNetworkStatsRT(id_device: string): Observable<NetworkStats[]> {
    return this.apollo
      .watchQuery<{ networkStats: NetworkStats[] }>({
        query: GET_NETWORK_STATS,
        variables: {
          id_device: id_device
        }
      })
      .valueChanges.pipe(map((result: any) => {
        const data = result.data.networkStats.slice(0, 100)
        data.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
        this.networkStatsDataSubject.next(data)
        return data
      }));
  }

  getDashboardDeviceDataRT(id_device: string): Observable<any> {
    return this.apollo
    .watchQuery<{ dashboardDeviceDataRT: DashboardDeviceDataRT }>({
      query: GET_DASHBOARD_DEVICE_DATA,
      variables: {
        id_device: id_device
      }
    })
    .valueChanges.pipe(map((result: any) => {
      const dashboardDeviceData = result.data.dashboardDeviceDataRT

      const ramUsageData = dashboardDeviceData.ramUsage.slice(0, 100)
      ramUsageData.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
      this.ramDataSubject.next(ramUsageData)

      const cpuTemperatureData = dashboardDeviceData.cpuTemperature.slice(0, 100)
      cpuTemperatureData.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
      this.cpuTempDataSubject.next(cpuTemperatureData)

      const cpuUsageData = dashboardDeviceData.cpuUsage.slice(0, 100)
      cpuUsageData.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
      this.cpuUsageDataSubject.next(cpuUsageData)

      const diskUsageData = dashboardDeviceData.diskUsage.slice(0, 100)
      diskUsageData.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
      this.diskUsageDataSubject.next(diskUsageData)

      const loadAverageData = dashboardDeviceData.loadAverage.slice(0, 100)
      loadAverageData.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
      this.loadAverageDataSubject.next(loadAverageData)

      const networkStatsData = dashboardDeviceData.networkStats.slice(0, 100)
      networkStatsData.sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc)
      this.networkStatsDataSubject.next(networkStatsData)

      return { ramUsageData, cpuTemperatureData, cpuUsageData, diskUsageData, loadAverageData, networkStatsData}
    }));
  }

  newDeviceDataSubscription(id_device: string): Observable<any> {
    return this.apollo
      .subscribe({
        query: NEW_DEVICE_DATA_SUBSCRIPTION,
        variables: { id_device },
      })
      .pipe(
        map((result: any) => {
          const newData = result.data.newDeviceData
          if (this.updateData[newData.parameter]) {
            this.updateData[newData.parameter](newData.data);
          }
        }),
        catchError((error: any) => {
          console.error("Error en la suscripción:", error);
          return of(null); // O alguna lógica de recuperación
        })
      )
  }

  getRealTimeRamData(): Observable<RamUsage[]> {
    return this.ramDataSubject.asObservable()
  }

  getRealTimeCpuTempData(): Observable<CpuTemperature[]> {
    return this.cpuTempDataSubject.asObservable()
  }

  getRealTimeCpuUsageData(): Observable<CpuUsage[]> {
    return this.cpuUsageDataSubject.asObservable()
  }

  getRealTimeDiskUsageData(): Observable<DiskUsage[]> {
    return this.diskUsageDataSubject.asObservable()
  }

  getRealTimeLoadAverageData(): Observable<LoadAverage[]> {
    return this.loadAverageDataSubject.asObservable()
  }

  getRealTimeNetworkStatsData(): Observable<NetworkStats[]> {
    return this.networkStatsDataSubject.asObservable()
  }
}
