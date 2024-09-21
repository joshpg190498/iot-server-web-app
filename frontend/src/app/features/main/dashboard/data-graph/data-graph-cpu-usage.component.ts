import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CpuUsage } from 'src/app/core/interfaces/dashboard.interface';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexDataLabels,
  ApexStroke
} from 'ng-apexcharts';

@Component({
  selector: 'app-data-graph-cpu-usage',
  templateUrl: './data-graph-cpu-usage.component.html',
  styleUrls: ['./data-graph.component.scss']
})
export class DataGraphCpuUsageComponent implements OnChanges, OnInit {
  @Input() cpuUsageData: CpuUsage[] = [];
  public chartSeries: ApexAxisChartSeries = [];
  public chartOptions: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cpuUsageData']) {
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
          text: 'Utilización (%)'
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
    const cpuUsageTrend = this.cpuUsageData.map((el: CpuUsage) => ({
      x: new Date(Number(el.collected_at_utc)).toLocaleString(),
      y: Number(el.cpu_usage)
    }));

    this.chartSeries = [
      {
        name: 'Uso CPU',
        data: cpuUsageTrend
      }
    ];
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
