import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { DashboardComponent } from './dashboard.component';
import { DataGraphComponent } from './data-graph/data-graph.component';
import { DataGraphRamUsageComponent } from './data-graph/data-graph-ram-usage.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataGraphCpuTemperatureComponent } from './data-graph/data-graph-cpu-temperature.component';
import { DataGraphCpuUsageComponent } from './data-graph/data-graph-cpu-usage.component';
import { DataGraphDiskUsageComponent } from './data-graph/data-graph-disk-usage.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    DashboardComponent,
    DataGraphComponent,
    DataGraphRamUsageComponent,
    DataGraphCpuTemperatureComponent,
    DataGraphCpuUsageComponent,
    DataGraphDiskUsageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxChartsModule,
    NgApexchartsModule
  ]
})
export class DashboardModule { }
