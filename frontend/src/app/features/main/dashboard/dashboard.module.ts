import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { DashboardComponent } from './dashboard.component';
import { DataGraphComponent } from './data-graph/data-graph.component';
import { DataGraphRamUsageComponent } from './data-graph/data-graph-ram-usage.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataGraphCpuTemperatureComponent } from './data-graph/data-graph-cpu-temperature.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DataGraphComponent,
    DataGraphRamUsageComponent,
    DataGraphCpuTemperatureComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
