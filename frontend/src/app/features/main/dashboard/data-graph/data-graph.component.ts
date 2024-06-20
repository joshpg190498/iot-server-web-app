import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CpuTemperature, RamUsage } from 'src/app/core/interfaces/dashboard.interface';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-data-graph',
  templateUrl: './data-graph.component.html',
  styleUrls: ['./data-graph.component.scss'],
})
export class DataGraphComponent  implements OnInit {
  cpuTemperatureData: CpuTemperature[] = [];
  ramUsageData: RamUsage[] = [];
  ramUsageDataLoaded = false; // Variable para verificar si la data está cargada
  cpuTemperatureDataLoaded = false

  constructor(
    private _dashboardService: DashboardService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
     const id = params.get('id');
      console.log(id); // Aquí puedes utilizar el id como desees
      this.getCpuTemperature(id || '')
      this.getRamUsage(id || '')
    });
  }

  getCpuTemperature(id_device: string) {
    console.log('llamando a devices')
    this._dashboardService.getCpuTemperature(id_device).subscribe(
      (cpuTemperature) => {
        console.log('cpuTemperature:', cpuTemperature);
        this.cpuTemperatureData = cpuTemperature
        this.checkCpuTemperatureDataLoaded(); 

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

  getRamUsage(id_device: string) {
    console.log('llamando a devices')
    this._dashboardService.getRamUsage(id_device).subscribe(
      (ramUsage) => {
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
  }

}
