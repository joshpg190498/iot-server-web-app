import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core'
import { RamUsage } from 'src/app/core/interfaces/dashboard.interface'
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
  selector: 'app-real-time-ram-usage',
  templateUrl: './real-time-ram-usage.component.html',
  styleUrls: ['../data-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RealTimeRamUsageComponent implements OnChanges {
  @Input() ramUsageData: RamUsage[] = []
  public chartSeries: ApexAxisChartSeries = []
  public chartOptions: any
  @Input() deviceId: string = '' 

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ramUsageData'] || changes['deviceId']) {
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
          show: true, 
          format: 'dd-MM-yy HH:mm:ss'
        }
      },
      yaxis: {
        title: {
          text: 'RAM Usada (%)'
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
        },
        y: {
          formatter: (value: number, { series, seriesIndex, dataPointIndex, w }: any) => {
            const usedRamMB = w.config.series[seriesIndex].data[dataPointIndex].usedRamMB
            return usedRamMB ? `${usedRamMB} MB` : 'N/A'
          }
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
    const usedRamTrend = this.ramUsageData
    .filter(({ id_device }) => id_device === this.deviceId)
    .map((el: RamUsage) => {
      const timestamp = new Date(Number(el.collected_at_utc)).getTime()
      if (isNaN(timestamp) || el.used_ram === null || el.used_percent_ram === null) {
        return 
      }

      return {
        x: timestamp, 
        y: el.used_percent_ram, 
        usedRamMB: Number(el.used_ram) 
      }
    })
    .filter((p): p is { x: number; y: number; usedRamMB: number } => p !== null)


    this.chartSeries = [
      {
        name: 'RAM Usada',
        data: usedRamTrend
      }
    ]
  }
}
