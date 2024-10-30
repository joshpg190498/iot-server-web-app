import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parameter } from '../interfaces/parameter.interface';
import { HistoricData } from '../interfaces/historic-data.interface';

const GET_PARAMETERES_QUERY = gql`
  query parameters {
    parameters {
      id_parameter
      default_period
      table_pointer
      description
      has_threshold
      default_threshold_value
    }
  }
`;

const GET_TABULAR_DATA = gql`
  query tabularData($table_pointer: String!, $id_device: String!) {
    tabularData(table_pointer: $table_pointer, id_device: $id_device) {
      data
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DataTabularService {

  constructor(private apollo: Apollo) {}

  getParameters(): Observable<Parameter[]> {
    return this.apollo
      .query<{ parameters: Parameter[] }>({
        query: GET_PARAMETERES_QUERY
      })
      .pipe(map((result: any) => result.data.parameters))
  }

  getTabularData(id_device: string, table_pointer: string): Observable<any> {
    return this.apollo
      .query<{ tabularData: any }>({
        query: GET_TABULAR_DATA,
        variables: {
          id_device: id_device,
          table_pointer: table_pointer
        }
      })
      .pipe(map((result: any) => result.data.tabularData))
  }
}
