import { Component, Inject, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'
import { Parameter } from 'src/app/core/interfaces/parameter.interface'
import { ThresholdAlertService } from 'src/app/core/services/threshold-alert.service'
import { ngxCsv } from 'ngx-csv'

@Component({
  selector: 'app-threshold-alert',
  templateUrl: './threshold-alert.component.html',
  styleUrls: ['../data-graph.component.scss'],
})
export class ThresholdAlertComponent  implements OnInit {

  idDevice: string = ''
  parameters: Parameter[] = []
  selectedParameter: string = ''
  parameterData: any = {}
  displayedColumns = ['nro', 'id_device', 'value', 'email_sent',  'date']

  pageSize: number = 10
  pageIndex: number = 0
  dataSource: any[] = []

  constructor(
    private _thresholdAlertService: ThresholdAlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idDevice = params.get('id') || ''
      if (!this.idDevice) return
      this.getParameters()
    })
  }

  getParameters() {
    this._thresholdAlertService.getParameters()
      .subscribe({
        next: (data: any) => {
          this.parameters = data.filter((e: any) => e.has_threshold)
          this.onParameterChange(this.parameters[0].id_parameter || '')
        },
        error: (err: any) => {
          console.error(err)
        }
      })
  }

  fetchData(id_parameter: string) {
    if (!id_parameter) return
    this._thresholdAlertService.getThresholdAlertData(this.idDevice, id_parameter).subscribe({
      next: (result: any) => {
        this.parameterData = result.map((item: any) => ({
          ...item,
          created_at_utc: new Date(Number(item.created_at_utc)).toISOString()
        }))
        this.updateDataSource()
      },
      error: (err: any) => console.error(err)
    })
  }

  onParameterChange(idParameter: string) {
    if (idParameter) {
      this.selectedParameter = idParameter
      const parameter = this.parameters.find((el: any) => el.id_parameter == idParameter)
      const id_parameter = parameter?.id_parameter || ''
      this.fetchData(id_parameter)
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex 
    this.pageSize = event.pageSize
    this.updateDataSource()
  }

  updateDataSource() {
    const startIndex = this.pageIndex * this.pageSize
    const endIndex = startIndex + this.pageSize
    this.dataSource = this.parameterData.slice(startIndex, endIndex).map((item: any, index: any) => ({
      ...item,
      position: startIndex + index + 1,
      value: JSON.parse(item.data).Value,
      email_sent: item.email_sent ? 'Sí' : 'No'
    }))
  }

  downloadCSV() {
    const options = {
      filename: 'datos_alerta',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Datos de Alertas',
      useBom: true,
      headers: ['def_name', 'id', 'id_device', 'data', 'sent_email', 'date'], 
      noDownload: false,
      removeEmptyValues: false,
    }

    new ngxCsv(this.parameterData, options.filename, options)
  }

}
