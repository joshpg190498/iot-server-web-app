import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core'
import { NetworkStats } from 'src/app/core/interfaces/dashboard.interface'
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
} from 'ng-apexcharts'

@Component({
  selector: 'app-data-graph-network-stats',
  templateUrl: './data-graph-network-stats.component.html',
  styleUrls: ['./data-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataGraphNetworkStatsComponent implements OnChanges {
  @Input() networkStatsData: NetworkStats[] = []
  public chartSeries: ApexAxisChartSeries = []
  public chartOptions: any

  ngOnChanges(changes: SimpleChanges) {
    if (changes['networkStatsData']) {
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
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd/MM/yy HH:mm',
          show: true,
          fontSize: '8px'
        }
      },
      yaxis: {
        title: {
          text: 'Tráfico de red (MB)'
        },
        labels: {
          formatter: (val: any) => {
            return val + ' MB'
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
          formatter: (val: number) => {
            return new Date(val).toLocaleString()
          }
        }
      },
      grid: {
        show: true
      }
    }
  }

  parseData() {
    const trafficData: Record<string, { name: string, data: { x: number, y: number }[] }> = {}

    this.networkStatsData.forEach(({ interface_name, bytes_recv, bytes_sent, collected_at_utc }: NetworkStats) => {
      if (!interface_name) return

      if (!trafficData[`${interface_name}_bytes_recv`]) {
        trafficData[`${interface_name}_bytes_recv`] = { name: `${interface_name}_bytes_recv`, data: [] }
      }

      if (!trafficData[`${interface_name}_bytes_sent`]) {
        trafficData[`${interface_name}_bytes_sent`] = { name: `${interface_name}_bytes_sent`, data: [] }
      }

      if (!bytes_recv && typeof bytes_recv !== 'number') return 
      if (!bytes_sent && typeof bytes_sent !== 'number') return

      trafficData[`${interface_name}_bytes_recv`].data.push({
        x: new Date(Number(collected_at_utc)).getTime(),
        y: Number((Number(bytes_recv)/1024/1024).toFixed(2))
      })

      trafficData[`${interface_name}_bytes_sent`].data.push({
        x: new Date(Number(collected_at_utc)).getTime(),
        y: Number((Number(bytes_sent)/1024/1024).toFixed(2))
      })
      
    })

    this.chartSeries = Object.values(trafficData).map(item => ({
      name: item.name,
      data: item.data 
    }))
  }
}
