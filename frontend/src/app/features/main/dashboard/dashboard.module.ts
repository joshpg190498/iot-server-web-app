import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { DashboardComponent } from './dashboard.component';
import { DataGraphComponent } from './data-graph/data-graph.component';
import { RealTimeRamUsageComponent } from './data-graph/real-time/real-time-ram-usage.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RealTimeCpuTemperatureComponent } from './data-graph/real-time/real-time-cpu-temperature.component';
import { RealTimeCpuUsageComponent } from './data-graph/real-time/real-time-cpu-usage.component';
import { RealTimeDiskUsageComponent } from './data-graph/real-time/real-time-disk-usage.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RealTimeLoadAverageComponent } from './data-graph/real-time/real-time-load-average.component';
import { RealTimeNetworkStatsComponent } from './data-graph/real-time/real-time-network-stats.component';
import { DataHistoricComponent } from './data-graph/data-historic/data-historic.component';
import { DataTabularComponent } from './data-graph/data-tabular/data-tabular.component';
import { RealTimeComponent } from './data-graph/real-time/real-time.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DataGraphComponent,
    RealTimeRamUsageComponent,
    RealTimeCpuTemperatureComponent,
    RealTimeCpuUsageComponent,
    RealTimeDiskUsageComponent,
    RealTimeLoadAverageComponent,
    RealTimeNetworkStatsComponent,
    RealTimeComponent,
    DataHistoricComponent,
    DataTabularComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxChartsModule,
    NgApexchartsModule
  ],
  providers: [
    DatePipe
  ]
})
export class DashboardModule { }
