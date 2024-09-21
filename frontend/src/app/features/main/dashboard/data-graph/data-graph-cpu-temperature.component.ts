import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CpuTemperature } from 'src/app/core/interfaces/dashboard.interface';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexDataLabels,
  ApexFill,
  ApexStroke
} from 'ng-apexcharts';

@Component({
  selector: 'app-data-graph-cpu-temperature',
  templateUrl: './data-graph-cpu-temperature.component.html',
  styleUrls: ['./data-graph.component.scss']
})
export class DataGraphCpuTemperatureComponent implements OnChanges {
  @Input() cpuTemperatureData: CpuTemperature[] = [];
  public chartSeries: ApexAxisChartSeries = [];
  public chartOptions: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cpuTemperatureData']) {
      this.parseData();
    }
  }

  ngOnInit() {
    this.initializeChartOptions();
  }

  initializeChartOptions() {
    this.chartOptions = {
      chart: {
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        }
      },
      xaxis: {
        type: 'string',
        labels: {
          format: 'dd/MM/yy HH:mm:ss',
          show: false
        }
      },
      yaxis: {
        title: {
          text: 'Temperatura (°C)'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm:ss'
        }
      },
      grid: {
        show: true
      }
    };
  }

  parseData() {
    const sensorData: Record<string, { name: string; data: { x: string; y: number }[] }> = {};

    this.cpuTemperatureData.forEach(({ sensor_key, collected_at_utc, temperature }: CpuTemperature) => {
      if (!sensor_key) return;

      if (!sensorData[sensor_key]) {
        sensorData[sensor_key] = { name: sensor_key, data: [] };
      }

      if (collected_at_utc && temperature) {
        sensorData[sensor_key].data.push({
          x: new Date(Number(collected_at_utc)).toLocaleString(),
          y: Number(temperature)
        });
      }
    });

    this.chartSeries = Object.values(sensorData).map(item => ({
      name: item.name,
      data: item.data 
    }));
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
