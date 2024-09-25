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

  constructor(
    private _dashboardService: DashboardService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
     const id = params.get('id') || ''
     if (!id) return
     this.subscriptions.push(
      this._dashboardService.getRamUsageRT(id).subscribe(ramUsageData => {
        this.ramUsageData = ramUsageData
        this.ramUsageDataLoaded = true
      })
    )

    this.subscriptions.push(
      this._dashboardService.getCpuTemperatureRT(id).subscribe(cpuTemperatureData => {
        this.cpuTemperatureData = cpuTemperatureData
        this.cpuTemperatureDataLoaded = true
      })
    )

    this.subscriptions.push(
      this._dashboardService.getCpuUsageRT(id).subscribe(cpuUsageData => {
        this.cpuUsageData = cpuUsageData
        this.cpuUsageDataLoaded = true
      })
    )

    this.subscriptions.push(
      this._dashboardService.getDiskUsageRT(id).subscribe(diskUsageData => {
        this.diskUsageData = diskUsageData
        this.diskUsageDataLoaded = true
      })
    )

    this.subscriptions.push(
      this._dashboardService.getLoadAverageRT(id).subscribe(loadAverageData => {
        this.loadAverageData = loadAverageData
        this.loadAverageDataLoaded = true
      })
    )

    this.subscriptions.push(
      this._dashboardService.getNetworkStatsRT(id).subscribe(networkStatsData => {
        this.networkStatsData = networkStatsData
        this.networkStatsDataLoaded = true
      })
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

  /* subscribeWs(id_device: string): void {
    this._dashboardService.newDeviceDataSubscription(id_device)
  }

  getCpuTemperature(id_device: string) {
    console.log('llamando a devices')
    this._dashboardService.getCpuTemperature(id_device).subscribe(
      (cpuTemperature) => {
        console.log('cpuTemperature:', cpuTemperature)
        this.cpuTemperatureData = cpuTemperature
        this.checkCpuTemperatureDataLoaded() 

      },
      (error) => {
        let message = error.message
        if (error.graphQLErrors) {
          console.error('Error logging in:', error.graphQLErrors)
          message = error.graphQLErrors[0].message
        }
      }
    )
  }

  getRamUsage(id_device: string) {
    console.log('llamando a devices')
    this._dashboardService.getRamUsage(id_device).subscribe(
      (ramUsage) => {
        console.log(ramUsage, 'ram')
        this.ramUsageData = ramUsage
        this.checkRamUsageDataLoaded(); 
      },
      (error) => {
        let message = error.message
        if (error.graphQLErrors) {
          console.error('Error logging in:', error.graphQLErrors);
          message = error.graphQLErrors[0].message
        }
      }
    );
  }

  checkRamUsageDataLoaded() {
    if (this.ramUsageData.length > 0) {
      this.ramUsageDataLoaded = true;
    }
  }

  checkCpuTemperatureDataLoaded() {
    if (this.cpuTemperatureData.length > 0) {
      this.cpuTemperatureDataLoaded = true;
    }
  } */

}
