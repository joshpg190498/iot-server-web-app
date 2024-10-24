import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core'
import { CpuUsage } from 'src/app/core/interfaces/dashboard.interface'
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexDataLabels,
  ApexStroke
} from 'ng-apexcharts'

@Component({
  selector: 'app-data-graph-cpu-usage',
  templateUrl: './data-graph-cpu-usage.component.html',
  styleUrls: ['./data-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataGraphCpuUsageComponent implements OnChanges, OnInit {
  @Input() cpuUsageData: CpuUsage[] = []
  public chartSeries: ApexAxisChartSeries = []
  public chartOptions: any

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cpuUsageData']) {
      this.parseData()
    }
  }

  ngOnInit() {
    this.initializeChartOptions()
  }

  initializeChartOptions() {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: '240px',
        animations: {
          enabled: false,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd-MM-yy HH:mm:ss',
          show: true
        }
      },
      yaxis: {
        title: {
          text: 'Utilización (%)'
        },
        labels: {
          formatter: (val: any) => {
            return val + ' %'
          }
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
          format: 'dd-MM-yy HH:mm:ss'
        }
      },
      grid: {
        show: true
      }
    }
  }

  parseData() {
    const cpuUsageTrend = this.cpuUsageData.map(({ cpu_usage, collected_at_utc}: CpuUsage) => ({
      x: new Date(Number(collected_at_utc)).getTime(),
      y: Number(cpu_usage)
    }))

    this.chartSeries = [
      {
        name: 'Uso CPU',
        data: cpuUsageTrend
      }
    ]
  }
}
