import { Component, Inject, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'
import { Parameter } from 'src/app/core/interfaces/parameter.interface'
import { DataTabularService } from 'src/app/core/services/data-tabular.service'
import { ngxCsv } from 'ngx-csv'

@Component({
  selector: 'app-data-tabular',
  templateUrl: './data-tabular.component.html',
  styleUrls: ['../data-graph.component.scss'],
})
export class DataTabularComponent  implements OnInit {

  idDevice: string = ''
  parameters: Parameter[] = []
  selectedParameter: string = ''
  parameterData: any = {}
  displayedColumns: string[] = []
  pageSize: number = 10
  pageIndex: number = 0
  dataSource: any[] = []

  constructor(
    private _dataTabularService: DataTabularService,
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
    this._dataTabularService.getParameters()
      .subscribe({
        next: (data: any) => {
          this.parameters = data
          this.onParameterChange(this.parameters[0].id_parameter || '')
        },
        error: (err: any) => {
          console.error(err)
        }
      })
  }

  fetchData(table_pointer: string) {
    if (!table_pointer) return
    this._dataTabularService.getTabularData(this.idDevice, table_pointer).subscribe({
      next: (result: any) => {
        this.parameterData = result.data
        console.log('data fetch', this.parameterData)
        if (this.parameterData.length > 0) {
          this.displayedColumns = Object.keys(this.parameterData[0])
          this.updateDataSource()
        } else {
          this.displayedColumns = []
        }
      },
      error: (err: any) => console.error(err)
    })
  }

  onParameterChange(idParameter: string) {
    if (idParameter) {
      this.selectedParameter = idParameter
      const parameter = this.parameters.find((el: any) => el.id_parameter == idParameter)
      const table_pointer = parameter?.table_pointer || ''
      this.fetchData(table_pointer)
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex 
    this.updateDataSource()
  }

  updateDataSource() {
    const startIndex = this.pageIndex * this.pageSize
    const endIndex = startIndex + this.pageSize
    this.dataSource = this.parameterData.slice(startIndex, endIndex).map((item: any, index: any) => ({
      ...item,
      id: startIndex + index + 1 
    }))
  }

  downloadCSV() {
    const options = {
      filename: 'datos_parametro',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Datos de Parámetro',
      useBom: true,
      headers: this.displayedColumns, 
      noDownload: false,
      removeEmptyValues: false,
    }

    new ngxCsv(this.parameterData, options.filename, options)
  }

}
