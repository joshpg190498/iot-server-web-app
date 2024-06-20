
import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { CpuTemperature } from 'src/app/core/interfaces/dashboard.interface';


@Component({
  selector: 'app-data-graph-cpu-temperature',
  templateUrl: './data-graph-cpu-temperature.component.html',
  styleUrls: ['./data-graph.component.scss']
})
export class DataGraphCpuTemperatureComponent implements OnInit {
  @Input() cpuTemperatureData: CpuTemperature[] = [];
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
  yAxisLabel: string = '° C';
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
    const sensorData: { [key: string]: { name: string, series: { name: string, value: number }[] } } = {};
  
    this.cpuTemperatureData.forEach((el: CpuTemperature) => {
      // Asegúrate de que el.sensor_key esté definido
      if (el.sensor_key) {
        if (!sensorData[el.sensor_key]) {
          sensorData[el.sensor_key] = { name: el.sensor_key, series: [] };
        }

        if (el.collected_at_utc && el.temperature) {
          sensorData[el.sensor_key].series.push({
            name: new Date(Number(el.collected_at_utc)).toLocaleString(),
            value: el.temperature
          });
        }
      }

    });

    console.log(sensorData,' datatemp')
    console.log(Object.values(sensorData),' datatemp')

    this.multi = Object.values(sensorData);
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
