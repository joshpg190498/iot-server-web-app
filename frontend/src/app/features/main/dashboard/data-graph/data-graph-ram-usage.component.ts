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
  selector: 'app-data-graph-ram-usage',
  templateUrl: './data-graph-ram-usage.component.html',
  styleUrls: ['./data-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataGraphRamUsageComponent implements OnChanges {
  @Input() ramUsageData: RamUsage[] = []
  public chartSeries: ApexAxisChartSeries = []
  public chartOptions: any

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ramUsageData']) {
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
          show: true, 
          format: 'dd/MM/yy HH:mm:ss'
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
          formatter: (val: number) => {
            return new Date(val).toLocaleString()
          }
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
      }
    }
  }

  parseData() {
    const usedRamTrend = this.ramUsageData.map((el: RamUsage) => {
      if (el.used_ram === null || el.used_percent_ram === null) {
        return {
          x: new Date(Number(el.collected_at_utc)).getTime(), 
          y: null,
          usedRamMB: null
        }
      }

      return {
        x: new Date(Number(el.collected_at_utc)).getTime(), 
        y: el.used_percent_ram, 
        usedRamMB: Number(el.used_ram) 
      }
    })

    this.chartSeries = [
      {
        name: 'RAM Usada',
        data: usedRamTrend
      }
    ]
  }
}
