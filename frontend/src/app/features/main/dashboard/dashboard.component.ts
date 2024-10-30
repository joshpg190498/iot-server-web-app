import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Device } from 'src/app/core/interfaces/dashboard.interface';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {


  devices: Device[] = []

  constructor(
    private router: Router,
    private _dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getDevices()
  }

  getDevices() {
    this._dashboardService.getDevices().subscribe(
      (devices) => {
        this.devices = devices
      },
      (error) => {
        console.log(error.networkError.error.errors[0].message)
        let message = error.message
        if (error.graphQLErrors) {
          console.error('Error logging in:', error.graphQLErrors);
          message = error.graphQLErrors[0].message
        }
      }
    );
  }

  goToGraphs(id_device: string): void {
    this.router.navigate([`/dashboard/${id_device}/data-graph`]);
  }

  
}
