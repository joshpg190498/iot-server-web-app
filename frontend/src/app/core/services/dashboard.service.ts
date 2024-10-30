import { Injectable } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { CpuTemperature, CpuUsage, DashboardDeviceDataRT, Device, DiskUsage, LoadAverage, NetworkStats, RamUsage } from '../interfaces/dashboard.interface'

interface NewDeviceData {
  parameter: 'ram' | 'cpu_temp' | 'cpu_usage' | 'disk' | 'load_average' | 'network_stats'
  id_device: string
  data: any[]
}

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
  private ramDataSubjects = new Map<string, BehaviorSubject<RamUsage[]>>()
  private cpuTempDataSubjects = new Map<string, BehaviorSubject<CpuTemperature[]>>()
  private cpuUsageDataSubjects = new Map<string, BehaviorSubject<CpuUsage[]>>()
  private diskUsageDataSubjects = new Map<string, BehaviorSubject<DiskUsage[]>>()
  private loadAverageDataSubjects = new Map<string, BehaviorSubject<LoadAverage[]>>()
  private networkStatsDataSubjects = new Map<string, BehaviorSubject<NetworkStats[]>>()

  private getOrCreateSubject<T>(map: Map<string, BehaviorSubject<T[]>>, id_device: string): BehaviorSubject<T[]> {
    if (!map.has(id_device)) {
      map.set(id_device, new BehaviorSubject<T[]>([]))
    }
    return map.get(id_device)!
  }

  constructor(private apollo: Apollo) {}

  getDevices(): Observable<Device[]> {
    return this.apollo
      .query<{ dashboardDevices: Device[] }>({ query: GET_DEVICES_QUERY })
      .pipe(map((result: any) => result.data.dashboardDevices))
  }

  getDashboardDeviceDataRT(id_device: string): Observable<any> {
    return this.apollo.query<{ dashboardDeviceDataRT: DashboardDeviceDataRT }>({
      query: GET_DASHBOARD_DEVICE_DATA,
      variables: { id_device },
    })
    .pipe(
      map((result: any) => {
        const dashboardDeviceData = result.data.dashboardDeviceDataRT
        const ramSubject = this.getOrCreateSubject(this.ramDataSubjects, id_device)
        const cpuTempSubject = this.getOrCreateSubject(this.cpuTempDataSubjects, id_device)
        const cpuUsageSubject = this.getOrCreateSubject(this.cpuUsageDataSubjects, id_device)
        const diskUsageSubject = this.getOrCreateSubject(this.diskUsageDataSubjects, id_device)
        const loadAverageSubject = this.getOrCreateSubject(this.loadAverageDataSubjects, id_device)
        const networkStatsSubject = this.getOrCreateSubject(this.networkStatsDataSubjects, id_device)

        ramSubject.next(dashboardDeviceData.ramUsage.slice(0, 100).sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc))
        cpuTempSubject.next(dashboardDeviceData.cpuTemperature.slice(0, 100).sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc))
        cpuUsageSubject.next(dashboardDeviceData.cpuUsage.slice(0, 100).sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc))
        diskUsageSubject.next(dashboardDeviceData.diskUsage.slice(0, 100).sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc))
        loadAverageSubject.next(dashboardDeviceData.loadAverage.slice(0, 100).sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc))
        networkStatsSubject.next(dashboardDeviceData.networkStats.slice(0, 100).sort((a: any, b: any) => a.collected_at_utc - b.collected_at_utc))

        return { ramUsageData: ramSubject.value, cpuTemperatureData: cpuTempSubject.value, cpuUsageData: cpuUsageSubject.value, diskUsageData: diskUsageSubject.value, loadAverageData: loadAverageSubject.value, networkStatsData: networkStatsSubject.value }
      })
    )
  }

  

  newDeviceDataSubscription(id_device: string): Observable<any> {
    return this.apollo
      .subscribe({
        query: NEW_DEVICE_DATA_SUBSCRIPTION,
        variables: { id_device },
      })
      .pipe(
        map((result: any) => {
          const newData = result.data.newDeviceData as NewDeviceData
          if (sessionStorage.getItem('currentDevice') !== newData.id_device) return
          const subjectsMap = {
            ram: this.ramDataSubjects,
            cpu_temp: this.cpuTempDataSubjects,
            cpu_usage: this.cpuUsageDataSubjects,
            disk: this.diskUsageDataSubjects,
            load_average: this.loadAverageDataSubjects,
            network_stats: this.networkStatsDataSubjects
          }
          if (subjectsMap[newData.parameter]) {
            const subject = this.getOrCreateSubject(subjectsMap[newData.parameter], id_device)
            const currentData = subject.getValue()
            subject.next([...currentData, ...newData.data].slice(-100))
          }
        }),
        catchError((error: any) => {
          console.error("Error en la suscripción:", error)
          return of(null)
        })
      )
  }

  getRealTimeRamData(id_device: string): Observable<RamUsage[]> {
    return this.getOrCreateSubject(this.ramDataSubjects, id_device).asObservable()
  }

  getRealTimeCpuTempData(id_device: string): Observable<CpuTemperature[]> {
    return this.getOrCreateSubject(this.cpuTempDataSubjects, id_device).asObservable()
  }

  getRealTimeCpuUsageData(id_device: string): Observable<CpuUsage[]> {
    return this.getOrCreateSubject(this.cpuUsageDataSubjects, id_device).asObservable()
  }

  getRealTimeDiskUsageData(id_device: string): Observable<DiskUsage[]> {
    return this.getOrCreateSubject(this.diskUsageDataSubjects, id_device).asObservable()
  }

  getRealTimeLoadAverageData(id_device: string): Observable<LoadAverage[]> {
    return this.getOrCreateSubject(this.loadAverageDataSubjects, id_device).asObservable()
  }

  getRealTimeNetworkStatsData(id_device: string): Observable<NetworkStats[]> {
    return this.getOrCreateSubject(this.networkStatsDataSubjects, id_device).asObservable()
  }
}
