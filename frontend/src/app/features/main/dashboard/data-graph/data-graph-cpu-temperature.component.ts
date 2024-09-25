import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core'
import { CpuTemperature } from 'src/app/core/interfaces/dashboard.interface'
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
  selector: 'app-data-graph-cpu-temperature',
  templateUrl: './data-graph-cpu-temperature.component.html',
  styleUrls: ['./data-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataGraphCpuTemperatureComponent implements OnChanges {
  @Input() cpuTemperatureData: CpuTemperature[] = []
  public chartSeries: ApexAxisChartSeries = []
  public chartOptions: any

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cpuTemperatureData']) {
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
          text: 'Temperatura (°C)'
        },
        labels: {
          formatter: (val: any) => {
            return val + ' °C'
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
    const sensorData: Record<string, { name: string, data: { x: number, y: number }[] }> = {}

    this.cpuTemperatureData.forEach(({ sensor_key, collected_at_utc, temperature }: CpuTemperature) => {
      if (!sensor_key) return

      if (!sensorData[sensor_key]) {
        sensorData[sensor_key] = { name: sensor_key, data: [] }
      }

      if (temperature && typeof temperature !== 'number') {
        sensorData[sensor_key].data.push({
          x: new Date(Number(collected_at_utc)).getTime(),
          y: Number(temperature)
        })
      }
    })

    this.chartSeries = Object.values(sensorData).map(item => ({
      name: item.name,
      data: item.data 
    }))
  }
}
