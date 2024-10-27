import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CpuTemperature, CpuUsage, DiskUsage, LoadAverage, NetworkStats, RamUsage } from 'src/app/core/interfaces/dashboard.interface';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-data-graph',
  templateUrl: './data-graph.component.html',
  styleUrls: ['./data-graph.component.scss'],
})
export class DataGraphComponent  implements OnInit {
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

  constructor(
    private _dashboardService: DashboardService,
    private route: ActivatedRoute
  ) { 

    this.cards = [
      {
        title: 'RAM',
        dataLoaded: 'ramUsageDataLoaded',
        graphComponent: 'app-data-graph-ram-usage',
        data: 'ramUsageData'
      },
      {
        title: 'Temperatura CPU',
        dataLoaded: 'cpuTemperatureDataLoaded',
        graphComponent: 'app-data-graph-cpu-temperature',
        data: 'cpuTemperatureData'
      },
      {
        title: 'Uso CPU',
        dataLoaded: 'cpuUsageDataLoaded',
        graphComponent: 'app-data-graph-cpu-usage',
        data: 'cpuUsageData'
      },
      {
        title: 'Uso de Disco',
        dataLoaded: 'diskUsageDataLoaded',
        graphComponent: 'app-data-graph-disk-usage',
        data: 'diskUsageData'
      },
      {
        title: 'Load Average',
        dataLoaded: 'loadAverageDataLoaded',
        graphComponent: 'app-data-graph-load-average',
        data: 'loadAverageData'
      },
      {
        title: 'Tráfico de red',
        dataLoaded: 'networkStatsDataLoaded',
        graphComponent: 'app-data-graph-network-stats',
        data: 'networkStatsData'
      }
    ]

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
     const id = params.get('id') || ''
     if (!id) return

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
        console.log(error)
      }
    )
    )

    this.subscriptions.push(
      this._dashboardService.getRealTimeRamData().subscribe(ramUsageData => {
        this.ramUsageData = ramUsageData
      })
    )

    this.subscriptions.push(
      this._dashboardService.getRealTimeCpuTempData().subscribe(cpuTemperatureData => {
        this.cpuTemperatureData = cpuTemperatureData
      })
    )

    this.subscriptions.push(
      this._dashboardService.getRealTimeCpuUsageData().subscribe(cpuUsageData => {
        this.cpuUsageData = cpuUsageData
      })
    )

    this.subscriptions.push(
      this._dashboardService.getRealTimeDiskUsageData().subscribe(diskUsageData => {
        this.diskUsageData = diskUsageData
      })
    )

    this.subscriptions.push(
      this._dashboardService.getRealTimeLoadAverageData().subscribe(loadAverageData => {
        this.loadAverageData = loadAverageData
      })
    )

    this.subscriptions.push(
      this._dashboardService.getRealTimeNetworkStatsData().subscribe(networkStatsData => {
        this.networkStatsData = networkStatsData
      })
    )
    
    this._dashboardService.newDeviceDataSubscription(id).subscribe()
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
