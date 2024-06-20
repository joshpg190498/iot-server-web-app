
import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { RamUsage } from 'src/app/core/interfaces/dashboard.interface';


@Component({
  selector: 'app-data-graph-ram-usage',
  templateUrl: './data-graph-ram-usage.component.html',
  styleUrls: ['./data-graph.component.scss']
})
export class DataGraphRamUsageComponent implements OnInit {
  @Input() ramUsageData: RamUsage[] = [];
  multi: any[] = [];
  view: [number, number] = [1200, 600];


  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'MegaBytes';
  timeline: boolean = true;

  colorScheme: Color = {
    name: "cool",
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    group: ScaleType.Ordinal,
    selectable: true
  };

  constructor() {
  }

  ngOnInit() {
    this.parseData()

  }

  parseData() {
    console.log(this.ramUsageData)
    const usedRamTrend = this.ramUsageData.map((el: RamUsage) => ({
      name: new Date(Number(el.collected_at_utc)).toLocaleString(), 
      value: el.used_ram
    }))

    const freeRamTrend = this.ramUsageData.map((el: RamUsage) => ({
      name: new Date(Number(el.collected_at_utc)).toLocaleString(), 
      value: el.free_ram
    }))

    const totalRamTrend = this.ramUsageData.map((el: RamUsage) => ({
      name: new Date(Number(el.collected_at_utc)).toLocaleString(), 
      value: el.total_ram
    }))


    this.multi = [
      {
        "name": "RAM Usada",
        "series": usedRamTrend
      },
      {
        "name": "RAM Libre",
        "series": freeRamTrend
      },
      {
        "name": "RAM Total",
        "series": totalRamTrend
      }
    ]
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
