import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core'
import { DiskUsage } from 'src/app/core/interfaces/dashboard.interface'
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
  selector: 'app-real-time-disk-usage',
  templateUrl: './real-time-disk-usage.component.html',
  styleUrls: ['../data-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RealTimeDiskUsageComponent implements OnChanges {
  @Input() diskUsageData: DiskUsage[] = []
  public chartSeries: ApexAxisChartSeries = []
  public chartOptions: any
  @Input() deviceId: string = '' 

  ngOnChanges(changes: SimpleChanges) {
    if (changes['diskUsageData'] || changes['deviceId']) {
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
          text: 'Disco usado (%)'
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
            const usedDisk = w.config.series[seriesIndex].data[dataPointIndex].usedDiskMB
            return `${usedDisk} MB`
          }
        }
      },
      grid: {
        show: true
      }
    }
  }

  parseData() {
    const diskData: Record<string, { name: string, data: { x: number, y: number, usedDiskMB: number }[] }> = {}

    this.diskUsageData
    .filter(({ id_device }) => id_device === this.deviceId)
    .forEach(({ disk_name, collected_at_utc, used_disk, free_disk, used_percent_disk }: DiskUsage) => {
      if (!disk_name || !used_disk || !used_percent_disk) return

      if (!diskData[disk_name]) {
        diskData[disk_name] = { name: disk_name, data: [] }
      }

      if (collected_at_utc && used_percent_disk) {
        diskData[disk_name].data.push({
          x: new Date(Number(collected_at_utc)).getTime(),
          y: Number(used_percent_disk), 
          usedDiskMB: Number(used_disk)  
        })
      }
    })
    this.chartSeries = Object.values(diskData).map(item => ({
      name: item.name,
      data: item.data
    }))
  }
}
