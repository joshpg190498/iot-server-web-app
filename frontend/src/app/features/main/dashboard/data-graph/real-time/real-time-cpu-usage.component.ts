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
  selector: 'app-real-time-cpu-usage',
  templateUrl: './real-time-cpu-usage.component.html',
  styleUrls: ['../data-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RealTimeCpuUsageComponent implements OnChanges, OnInit {
  @Input() cpuUsageData: CpuUsage[] = []
  public chartSeries: ApexAxisChartSeries = []
  public chartOptions: any
  @Input() deviceId: string = '' 

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cpuUsageData'] || changes['deviceId']) {
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
        height: 240,
        animations: {
          enabled: false,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: true
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
      },
      noData: {
        text: "No hay datos disponibles",
        align: 'center',
        style: {
          color: "red",
          fontSize: "20px",
          fontFamily: 'Plus Jakarta Sans'
        }
      }
    }
  }

  parseData() {
    const cpuUsageTrend = this.cpuUsageData
    .filter(({ id_device }) => id_device === this.deviceId)
    .map(({ cpu_usage, collected_at_utc}: CpuUsage) => {
      const timestamp = new Date(Number(collected_at_utc)).getTime()
      if (!isNaN(timestamp) && cpu_usage) {
        return { x: timestamp, y: Number(cpu_usage) }
      }
      return null
    })
    .filter((p): p is { x: number; y: number } => p !== null)
    
    this.chartSeries = [
      {
        name: 'Uso CPU',
        data: cpuUsageTrend
      }
    ]
  }
}
