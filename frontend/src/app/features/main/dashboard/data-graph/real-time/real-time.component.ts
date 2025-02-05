import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { CpuTemperature, CpuUsage, DiskUsage, LoadAverage, NetworkStats, RamUsage } from 'src/app/core/interfaces/dashboard.interface'
import { DashboardService } from 'src/app/core/services/dashboard.service'

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['../data-graph.component.scss'],
})
export class RealTimeComponent implements OnInit {
  private subscriptions: Subscription[] = [] 
  cpuTemperatureData: CpuTemperature[] = []
  ramUsageData: RamUsage[] = []
  cpuUsageData: CpuUsage[] = []
  diskUsageData: DiskUsage[] = []
  loadAverageData: LoadAverage[] = []
  networkStatsData: NetworkStats[] = []
  ramUsageDataLoaded = false
  cpuTemperatureDataLoaded = false
  cpuUsageDataLoaded = false
  diskUsageDataLoaded = false
  loadAverageDataLoaded = false
  networkStatsDataLoaded = false
  cards: any = []
  deviceId: string = '' 

  constructor(
    private _dashboardService: DashboardService,
    private route: ActivatedRoute
  ) { 
    this.cards = [
      { title: 'RAM', dataLoaded: 'ramUsageDataLoaded', graphComponent: 'app-real-time-ram-usage', data: 'ramUsageData' },
      { title: 'Temperatura CPU', dataLoaded: 'cpuTemperatureDataLoaded', graphComponent: 'app-real-time-cpu-temperature', data: 'cpuTemperatureData' },
      { title: 'Uso CPU', dataLoaded: 'cpuUsageDataLoaded', graphComponent: 'app-real-time-cpu-usage', data: 'cpuUsageData' },
      { title: 'Uso de Disco', dataLoaded: 'diskUsageDataLoaded', graphComponent: 'app-real-time-disk-usage', data: 'diskUsageData' },
      { title: 'Load Average', dataLoaded: 'loadAverageDataLoaded', graphComponent: 'real-time-graph-load-average', data: 'loadAverageData' },
      { title: 'Tráfico de red', dataLoaded: 'networkStatsDataLoaded', graphComponent: 'app-real-time-network-stats', data: 'networkStatsData' }
    ]
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || ''
      if (!id) return
      this.deviceId = params.get('id') || ''
      sessionStorage.setItem('currentDevice', id)

      this.subscriptions.forEach(subscription => subscription.unsubscribe())
      this.subscriptions = []
      this.clearData()

      this.subscriptions.push(
        this._dashboardService.getDashboardDeviceDataRT(id)
          .subscribe(dashboardDeviceData => {
            this.ramUsageData = dashboardDeviceData.ramUsageData
            this.ramUsageDataLoaded = true
            this.cpuTemperatureData = dashboardDeviceData.cpuTemperatureData
            this.cpuTemperatureDataLoaded = true
            this.cpuUsageData = dashboardDeviceData.cpuUsageData
            this.cpuUsageDataLoaded = true
            this.diskUsageData = dashboardDeviceData.diskUsageData
            this.diskUsageDataLoaded = true
            this.loadAverageData = dashboardDeviceData.loadAverageData
            this.loadAverageDataLoaded = true
            this.networkStatsData = dashboardDeviceData.networkStatsData
            this.networkStatsDataLoaded = true
          }, (error) => {
            console.error(error)
          })
      )

      this.subscriptions.push(
        this._dashboardService.getRealTimeRamData(id).subscribe(ramUsageData => {
          this.ramUsageData = ramUsageData
        })
      )

      this.subscriptions.push(
        this._dashboardService.getRealTimeCpuTempData(id).subscribe(cpuTemperatureData => {
          this.cpuTemperatureData = cpuTemperatureData
        })
      )

      this.subscriptions.push(
        this._dashboardService.getRealTimeCpuUsageData(id).subscribe(cpuUsageData => {
          this.cpuUsageData = cpuUsageData
        })
      )

      this.subscriptions.push(
        this._dashboardService.getRealTimeDiskUsageData(id).subscribe(diskUsageData => {
          this.diskUsageData = diskUsageData
        })
      )

      this.subscriptions.push(
        this._dashboardService.getRealTimeLoadAverageData(id).subscribe(loadAverageData => {
          this.loadAverageData = loadAverageData
        })
      )

      this.subscriptions.push(
        this._dashboardService.getRealTimeNetworkStatsData(id).subscribe(networkStatsData => {
          this.networkStatsData = networkStatsData
        })
      )

      this.subscriptions.push(
        this._dashboardService.newDeviceDataSubscription(id).subscribe()
      )
    })
    
  }

  clearData() {
    this.ramUsageData = []
    this.cpuTemperatureData = []
    this.cpuUsageData = []
    this.diskUsageData = []
    this.loadAverageData = []
    this.networkStatsData = []
    this.ramUsageDataLoaded = false
    this.cpuTemperatureDataLoaded = false
    this.cpuUsageDataLoaded = false
    this.diskUsageDataLoaded = false
    this.loadAverageDataLoaded = false
    this.networkStatsDataLoaded = false
  }
}
