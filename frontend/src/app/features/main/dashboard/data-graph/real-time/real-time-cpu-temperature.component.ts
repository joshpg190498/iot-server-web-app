import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core'
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
  selector: 'app-real-time-cpu-temperature',
  templateUrl: './real-time-cpu-temperature.component.html',
  styleUrls: ['../data-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RealTimeCpuTemperatureComponent implements OnChanges {
  @Input() cpuTemperatureData: CpuTemperature[] = []
  @Input() deviceId: string = '' 

  public chartSeries: ApexAxisChartSeries = []
  public chartOptions: any

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cpuTemperatureData'] || changes['deviceId']) {
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
        },
        redrawOnParentResize: true,
        redrawOnWindowResize: true
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd-MM-yy HH:mm',
          show: true,
          fontSize: '8px'
        }
      },
      yaxis: {
        title: {
          text: 'Temperatura (°C)'
        },
        labels: {
          formatter: (val: any) => val + ' °C'
        }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      legend: { show: true, position: 'bottom' },
      tooltip: { x: { format: 'dd-MM-yy HH:mm:ss' } },
      grid: { show: true },
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
    const sensorData: Record<string, { name: string, data: { x: number, y: number }[] }> = {}

    this.cpuTemperatureData
      .filter(({ id_device }) => id_device === this.deviceId) 
      .forEach(({ sensor_key, collected_at_utc, temperature }: CpuTemperature) => {
        const timestamp = new Date(Number(collected_at_utc)).getTime()

        if (!sensor_key) return

        if (!sensorData[sensor_key]) {
          sensorData[sensor_key] = { name: sensor_key, data: [] }
        }

        if (!isNaN(timestamp) && temperature) {
          sensorData[sensor_key].data.push({
            x: timestamp,
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
