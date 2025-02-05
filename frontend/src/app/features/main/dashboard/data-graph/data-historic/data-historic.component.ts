import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
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
import { DiskUsage } from 'src/app/core/interfaces/dashboard.interface'
import { Parameter } from 'src/app/core/interfaces/parameter.interface'
import { DataHistoricService } from 'src/app/core/services/data-historic.service'

@Component({
  selector: 'app-data-historic',
  templateUrl: './data-historic.component.html',
  styleUrls: ['../data-graph.component.scss'],
})
export class DataHistoricComponent  implements OnInit {

  idDevice: string = ''
  hourlyParameters: Parameter[] = []
  selectedParameter: string = ''
  chartSeries: ApexAxisChartSeries = []
  chartOptions: any
  selectedTimeRange: string = 'oneDay'
  timeRanges = [
    { label: '1 Día', key: 'oneDay' },
    { label: '7 Días', key: 'sevenDays' },
    { label: '1 Mes', key: 'oneMonth' },
    { label: '6 Meses', key: 'sixMonths' }
  ]
  parameterData: any = {}

  constructor(
    private _dataHistoricService: DataHistoricService,
    private route: ActivatedRoute
  ) {
    this.initializeChartOptions()

   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idDevice = params.get('id') || ''
      if (!this.idDevice) return
      this.getHourlyParameters()
    })
  }

  getHourlyParameters() {
    this._dataHistoricService.getHourlyParameters()
      .subscribe({
        next: (data: any) => {
          this.hourlyParameters = data
          this.onParameterChange(this.hourlyParameters[0].id_parameter || '')
        },
        error: (err: any) => {
          console.error(err)
        }
      })
  }

  initializeChartOptions() {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: 500,
        animations: {
          enabled: false,
          easing: 'linear',
          dynamicAnimation: { speed: 1000 }
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
        labels: { format: 'dd-MM-yyyy HH:mm' }
      },
      yaxis: {
        title: { text: 'Valor' },
        labels: { formatter: (val: number) => val.toFixed(2) }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      legend: { show: true, position: 'bottom' },
      tooltip: {
        x: { format: 'dd-MM-yyyy HH:mm' }
      },
      grid: { show: true }
    }
  }

  fetchData(table_pointer: string) {
    if (!table_pointer) return
    this._dataHistoricService.getHistoricData(this.idDevice, table_pointer).subscribe({
      next: (data: any) => {
        this.parameterData = data
        this.pushDataOnChart()
      },
      error: (err: any) => console.error(err)
    })
  }

  changeTimeRange(key: string) {
    this.selectedTimeRange = key
    this.pushDataOnChart()
  }

  onParameterChange(idParameter: string) {
    if (idParameter) {
      this.selectedParameter = idParameter
      const parameter = this.hourlyParameters.find((el: any) => el.id_parameter == idParameter)
      const table_pointer = parameter?.table_pointer || ''
      this.selectedTimeRange = 'oneDay'
      this.fetchData(table_pointer)
    }
  }

  pushDataOnChart() {
    this.chartSeries = []
    if (!this.selectedParameter || !this.parameterData) return
    const parameter = this.hourlyParameters.find((el: any) => el.id_parameter === this.selectedParameter)
    if (!parameter) return
    switch (this.selectedParameter) {
      case 'ram':
        this.ramOnChart()
        break
      case 'disk':
        this.diskOnChart()
        break
      case 'cpu_temp':
        this.cpuTempOnChart()
        break
      case 'load_average':
        this.loadAverageOnChart()
        break
      case 'cpu_usage':
        this.cpuUsageOnChart()
        break
      default:
        break
    }
    
  }

  ramOnChart() {
    if (this.selectedTimeRange == 'oneDay') {
      const ramData: Record<string, { name: string, data: { x: number, y: number, usedRamMB: number }[] }> = {}

      this.parameterData[this.selectedTimeRange].forEach(({ collected_at_utc, used_ram, used_percent_ram }: any) => {
        if (!used_percent_ram || !collected_at_utc) return
  
        if (!ramData['RAM Usada']) {
          ramData['RAM Usada'] = { name: 'RAM Usada', data: [] }
        }
  
        if (collected_at_utc && used_percent_ram) {
          ramData['RAM Usada'].data.push({
            x: new Date(collected_at_utc).getTime(),
            y: Number(used_percent_ram),
            usedRamMB: Number(used_ram) 
          })
        }
      })
      this.chartOptions.yaxis = {
        title: {
          text: 'RAM Usada (%)'
        },
        labels: {
          formatter: (val: any) => {
            return val + ' %'
          }
        }
      }
      this.chartOptions.tooltip = {
        x: {
          format: 'dd-MM-yy HH:mm:ss'
        },
        y: {
          formatter: (value: number, { series, seriesIndex, dataPointIndex, w }: any) => {
            const usedRamMB = w.config.series[seriesIndex].data[dataPointIndex].usedRamMB
            return usedRamMB ? `${usedRamMB} MB` : 'N/A'
          }
        }
      }
      this.chartSeries = Object.values(ramData).map(item => ({
        name: item.name,
        data: item.data
      })) 
    } else {
      const ramData: Record<string, { name: string, data: { x: number, y: number, usedRamMB: number }[] }> = {}

      this.parameterData[this.selectedTimeRange].forEach(({ start_time, total_ram,  avg_used_percent_ram, max_used_percent_ram, min_used_percent_ram }: any) => {
  
        if (!ramData['RAM promedio']) {
          ramData['RAM promedio'] = { name: 'RAM promedio', data: [] }
        }
  
        if (start_time) {
          ramData['RAM promedio'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(avg_used_percent_ram),
            usedRamMB: Number(total_ram)*Number(avg_used_percent_ram) / 100
          })
        }

        if (!ramData['RAM mínima']) {
          ramData['RAM mínima'] = { name: 'RAM mínima', data: [] }
        }
  
        if (start_time) {
          ramData['RAM mínima'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(min_used_percent_ram),
            usedRamMB: Number(total_ram)*Number(min_used_percent_ram) / 100
          })
        }

        if (!ramData['RAM máxima']) {
          ramData['RAM máxima'] = { name: 'RAM máxima', data: [] }
        }
  
        if (start_time) {
          ramData['RAM máxima'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(max_used_percent_ram),
            usedRamMB: Number(total_ram)*Number(max_used_percent_ram) / 100
          })
        }
      })
      this.chartSeries = Object.values(ramData).map(item => ({
        name: item.name,
        data: item.data
      })) 
    }
  }

  diskOnChart() {
    if (this.selectedTimeRange == 'oneDay') {
      const diskData: Record<string, { name: string, data: { x: number, y: number, usedDiskMB: number}[] }> = {}

      this.parameterData[this.selectedTimeRange].forEach(({ disk_name, collected_at_utc, used_disk, free_disk, used_percent_disk }: any) => {
        if (!disk_name || !used_disk || !used_percent_disk) return
  
        if (!diskData[disk_name]) {
          diskData[disk_name] = { name: disk_name, data: [] }
        }
  
        if (collected_at_utc && used_percent_disk) {
          diskData[disk_name].data.push({
            x: new Date(collected_at_utc).getTime(),
            y: Number(used_percent_disk), 
            usedDiskMB: Number(used_disk) 
          })
        }
      })
      this.chartOptions.yaxis = {
        title: {
          text: 'Disco usado (%)'
        },
        labels: {
          formatter: (val: any) => {
            return val + ' %'
          }
        }
      }
      this.chartOptions.tooltip = {
        x: {
          format: 'dd-MM-yy HH:mm:ss'
        },
        y: {
          formatter: (value: number, { series, seriesIndex, dataPointIndex, w }: any) => {
            const usedDisk = w.config.series[seriesIndex].data[dataPointIndex].usedDiskMB
            return `${usedDisk} MB`
          }
        }
      }


      this.chartSeries = Object.values(diskData).map(item => ({
        name: item.name,
        data: item.data
      })) 
    } else {
      const diskData: Record<string, { name: string, data: { x: number, y: number, usedDiskMB: number }[] }> = {}

      this.parameterData[this.selectedTimeRange].forEach(({ disk_name, start_time, total_disk, avg_used_percent_disk, max_used_percent_disk, min_used_percent_disk }: any) => {
        if (!disk_name) return
  
        if (!diskData[`${disk_name} promedio`]) {
          diskData[`${disk_name} promedio`] = { name: `${disk_name} promedio`, data: [] }
        }
  
        if (start_time) {
          diskData[`${disk_name} promedio`].data.push({
            x: new Date(start_time).getTime(),
            y: Number(avg_used_percent_disk), 
            usedDiskMB: Number(total_disk) * Number(avg_used_percent_disk) / 100
          })
        }

        if (!diskData[`${disk_name} mínimo`]) {
          diskData[`${disk_name} mínimo`] = { name: `${disk_name} mínimo`, data: [] }
        }
  
        if (start_time) {
          diskData[`${disk_name} mínimo`].data.push({
            x: new Date(start_time).getTime(),
            y: Number(min_used_percent_disk), 
            usedDiskMB: Number(total_disk) * Number(min_used_percent_disk) / 100 
          })
        }

        if (!diskData[`${disk_name} máximo`]) {
          diskData[`${disk_name} máximo`] = { name: `${disk_name} máximo`, data: [] }
        }
  
        if (start_time) {
          diskData[`${disk_name} máximo`].data.push({
            x: new Date(start_time).getTime(),
            y: Number(max_used_percent_disk), 
            usedDiskMB: Number(total_disk) * Number(max_used_percent_disk) / 100 
          })
        }
      })
      this.chartSeries = Object.values(diskData).map(item => ({
        name: item.name,
        data: item.data
      })) 
    }
  }

  cpuTempOnChart() {
    if (this.selectedTimeRange == 'oneDay') {
      const cpuTempData: Record<string, { name: string, data: { x: number, y: number }[] }> = {}

      this.parameterData[this.selectedTimeRange].forEach(({ sensor_key, collected_at_utc, temperature }: any) => {
        if (!sensor_key || !temperature) return
  
        if (!cpuTempData[sensor_key]) {
          cpuTempData[sensor_key] = { name: sensor_key, data: [] }
        }
  
        if (collected_at_utc && temperature) {
          cpuTempData[sensor_key].data.push({
            x: new Date(collected_at_utc).getTime(),
            y: Number(temperature)
          })
        }
      })
      this.chartOptions.yaxis = {
        title: {
          text: 'Temperatura (°C)'
        },
        labels: {
          formatter: (val: any) => val + ' °C'
        }
      }

      this.chartOptions.tooltip = {
        x: {
          format: 'dd-MM-yy HH:mm:ss'
        },
        y: {
          formatter: (value: number) => {
            return `${value} °C`
          }
        }
      }

      this.chartSeries = Object.values(cpuTempData).map(item => ({
        name: item.name,
        data: item.data
      })) 
    } else {
      const cpuTempData: Record<string, { name: string, data: { x: number, y: number }[] }> = {}

      this.parameterData[this.selectedTimeRange].forEach(({ sensor_key, start_time, avg_temperature, max_temperature, min_temperature }: any) => {
        if (!sensor_key) return
  
        if (!cpuTempData[`${sensor_key} promedio`]) {
          cpuTempData[`${sensor_key} promedio`] = { name: `${sensor_key} promedio`, data: [] }
        }
  
        if (start_time) {
          cpuTempData[`${sensor_key} promedio`].data.push({
            x: new Date(start_time).getTime(),
            y: Number(avg_temperature)
          })
        }

        if (!cpuTempData[`${sensor_key} mínimo`]) {
          cpuTempData[`${sensor_key} mínimo`] = { name: `${sensor_key} mínimo`, data: [] }
        }
  
        if (start_time) {
          cpuTempData[`${sensor_key} mínimo`].data.push({
            x: new Date(start_time).getTime(),
            y: Number(min_temperature)
          })
        }

        if (!cpuTempData[`${sensor_key} máximo`]) {
          cpuTempData[`${sensor_key} máximo`] = { name: `${sensor_key} máximo`, data: [] }
        }
  
        if (start_time) {
          cpuTempData[`${sensor_key} máximo`].data.push({
            x: new Date(start_time).getTime(),
            y: Number(max_temperature)
          })
        }
      })
      this.chartSeries = Object.values(cpuTempData).map(item => ({
        name: item.name,
        data: item.data
      })) 
    }
  }

  cpuUsageOnChart() {
    if (this.selectedTimeRange == 'oneDay') {
      const cpuUsageData: Record<string, { name: string, data: { x: number, y: number}[] }> = {}

      this.parameterData[this.selectedTimeRange].forEach(({ collected_at_utc, cpu_usage }: any) => {
        if (!cpu_usage) return
  
        if (!cpuUsageData['Uso de CPU']) {
          cpuUsageData['Uso de CPU'] = { name: 'Uso de CPU', data: [] }
        }
  
        if (collected_at_utc && cpu_usage) {
          cpuUsageData['Uso de CPU'].data.push({
            x: new Date(collected_at_utc).getTime(),
            y: Number(cpu_usage)
          })
        }
      })
      this.chartOptions.yaxis = {
        title: {
          text: 'Utilización (%)'
        },
        labels: {
          formatter: (val: any) => {
            return val + ' %'
          }
        }
      }

      this.chartOptions.tooltip = {
        x: {
          format: 'dd-MM-yy HH:mm:ss'
        },
        y: {
          formatter: (value: number) => {
            return `${value} %`
          }
        }
      }

      this.chartSeries = Object.values(cpuUsageData).map(item => ({
        name: item.name,
        data: item.data
      })) 
    } else {
      const cpuUsageData: Record<string, { name: string, data: { x: number, y: number }[] }> = {}

      this.parameterData[this.selectedTimeRange].forEach(({ start_time, avg_cpu_usage, min_cpu_usage, max_cpu_usage }: any) => {
  
        if (!cpuUsageData['Uso de CPU promedio']) {
          cpuUsageData['Uso de CPU promedio'] = { name: 'Uso de CPU promedio', data: [] }
        }
  
        if (start_time) {
          cpuUsageData['Uso de CPU promedio'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(avg_cpu_usage)
          })
        }

        if (!cpuUsageData['Uso de CPU mínimo']) {
          cpuUsageData['Uso de CPU mínimo'] = { name: 'Uso de CPU mínimo', data: [] }
        }
  
        if (start_time) {
          cpuUsageData['Uso de CPU mínimo'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(min_cpu_usage)
          })
        }

        if (!cpuUsageData['Uso de CPU máximo']) {
          cpuUsageData['Uso de CPU máximo'] = { name: 'Uso de CPU máximo', data: [] }
        }
  
        if (start_time) {
          cpuUsageData['Uso de CPU máximo'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(max_cpu_usage)
          })
        }
      })
      this.chartSeries = Object.values(cpuUsageData).map(item => ({
        name: item.name,
        data: item.data
      })) 
    }
  }

  loadAverageOnChart() {
    if (this.selectedTimeRange == 'oneDay') {
      const loadAverageData: Record<string, { name: string, data: { x: number, y: number}[] }> = {}

      this.parameterData[this.selectedTimeRange].forEach(({ collected_at_utc, load_average_1m, load_average_5m, load_average_15m }: any) => {
        if (!load_average_1m || !load_average_5m || !load_average_15m) return
  
        if (!loadAverageData['Carga promedio 1m']) {
          loadAverageData['Carga promedio 1m'] = { name: 'Carga promedio 1m', data: [] }
        }
  
        if (collected_at_utc && load_average_1m) {
          loadAverageData['Carga promedio 1m'].data.push({
            x: new Date(collected_at_utc).getTime(),
            y: Number(load_average_1m)
          })
        }

        if (!loadAverageData['Carga promedio 5m']) {
          loadAverageData['Carga promedio 5m'] = { name: 'Carga promedio 5m', data: [] }
        }
  
        if (collected_at_utc && load_average_5m) {
          loadAverageData['Carga promedio 5m'].data.push({
            x: new Date(collected_at_utc).getTime(),
            y: Number(load_average_5m)
          })
        }

        if (!loadAverageData['Carga promedio 15m']) {
          loadAverageData['Carga promedio 15m'] = { name: 'Carga promedio 15m', data: [] }
        }
  
        if (collected_at_utc && load_average_15m) {
          loadAverageData['Carga promedio 15m'].data.push({
            x: new Date(collected_at_utc).getTime(),
            y: Number(load_average_15m)
          })
        }
      })
      this.chartOptions.yaxis = {
        title: {
          text: 'Load Average'
        }
      }

      this.chartOptions.tooltip = {
        x: {
          format: 'dd-MM-yy HH:mm:ss'
        },
        y: {
          formatter: (value: number) => {
            return `${value}`
          }
        }
      }

      this.chartSeries = Object.values(loadAverageData).map(item => ({
        name: item.name,
        data: item.data
      })) 
    } else {
      const loadAverageData: Record<string, { name: string, data: { x: number, y: number }[] }> = {}

      this.parameterData[this.selectedTimeRange].forEach(({ 
        start_time, avg_load_average_1m, avg_load_average_5m, avg_load_average_15m,
        min_load_average_1m, min_load_average_5m, min_load_average_15m,
        max_load_average_1m, max_load_average_5m, max_load_average_15m 
      }: any) => {
  
        if (!loadAverageData['Carga promedio 1m avg']) {
          loadAverageData['Carga promedio 1m avg'] = { name: 'Carga promedio 1m avg', data: [] }
        }
  
        if (start_time) {
          loadAverageData['Carga promedio 1m avg'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(avg_load_average_1m)
          })
        }

        if (!loadAverageData['Carga promedio 1m mínimo']) {
          loadAverageData['Carga promedio 1m mínimo'] = { name: 'Carga promedio 1m mínimo', data: [] }
        }
  
        if (start_time) {
          loadAverageData['Carga promedio 1m mínimo'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(min_load_average_1m)
          })
        }

        if (!loadAverageData['Carga promedio 1m máximo']) {
          loadAverageData['Carga promedio 1m máximo'] = { name: 'Carga promedio 1m máximo', data: [] }
        }
  
        if (start_time) {
          loadAverageData['Carga promedio 1m máximo'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(max_load_average_5m)
          })
        }

        if (!loadAverageData['Carga promedio 5m avg']) {
          loadAverageData['Carga promedio 5m avg'] = { name: 'Carga promedio 5m avg', data: [] }
        }
  
        if (start_time) {
          loadAverageData['Carga promedio 5m avg'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(avg_load_average_5m)
          })
        }

        if (!loadAverageData['Carga promedio 5m mínimo']) {
          loadAverageData['Carga promedio 5m mínimo'] = { name: 'Carga promedio 5m mínimo', data: [] }
        }
  
        if (start_time) {
          loadAverageData['Carga promedio 5m mínimo'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(min_load_average_5m)
          })
        }

        if (!loadAverageData['Carga promedio 5m máximo']) {
          loadAverageData['Carga promedio 5m máximo'] = { name: 'Carga promedio 5m máximo', data: [] }
        }
  
        if (start_time) {
          loadAverageData['Carga promedio 5m máximo'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(max_load_average_1m)
          })
        }

        if (!loadAverageData['Carga promedio 15m avg']) {
          loadAverageData['Carga promedio 15m avg'] = { name: 'Carga promedio 15m avg', data: [] }
        }
  
        if (start_time) {
          loadAverageData['Carga promedio 15m avg'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(avg_load_average_15m)
          })
        }

        if (!loadAverageData['Carga promedio 15m mínimo']) {
          loadAverageData['Carga promedio 15m mínimo'] = { name: 'Carga promedio 15m mínimo', data: [] }
        }
  
        if (start_time) {
          loadAverageData['Carga promedio 15m mínimo'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(min_load_average_15m)
          })
        }

        if (!loadAverageData['Carga promedio 15m máximo']) {
          loadAverageData['Carga promedio 15m máximo'] = { name: 'Carga promedio 15m máximo', data: [] }
        }
  
        if (start_time) {
          loadAverageData['Carga promedio 15m máximo'].data.push({
            x: new Date(start_time).getTime(),
            y: Number(max_load_average_15m)
          })
        }
      })
      this.chartSeries = Object.values(loadAverageData).map(item => ({
        name: item.name,
        data: item.data
      })) 
    }
  }
}
