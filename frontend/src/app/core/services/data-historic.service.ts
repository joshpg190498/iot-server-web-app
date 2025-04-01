import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parameter } from '../interfaces/parameter.interface';
import { HistoricData } from '../interfaces/historic-data.interface';

const GET_HOURLY_PARAMETERS_QUERY = gql`
  query hourlyParameters {
    hourlyParameters {
      id_parameter
      default_period
      table_pointer
      description
      has_threshold
      default_threshold_value
    }
  }
`;

const GET_HISTORIC_DATA_QUERY = gql`
  query historicData($table_pointer: String!, $id_device: String!) {
    historicData(table_pointer: $table_pointer, id_device: $id_device) {
      oneDay
      sevenDays
      oneMonth
      sixMonths
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DataHistoricService {

  constructor(private apollo: Apollo) {}

  getHourlyParameters(): Observable<Parameter[]> {
    return this.apollo
      .query<{ parameters: Parameter[] }>({
        query: GET_HOURLY_PARAMETERS_QUERY,
        fetchPolicy: 'network-only'
      })
      .pipe(map((result: any) => result.data.hourlyParameters))
  }

  getHistoricData(id_device: string, table_pointer: string): Observable<HistoricData> {
    console.log(table_pointer)
    return this.apollo
      .query<{ historicData: HistoricData }>({
        query: GET_HISTORIC_DATA_QUERY,
        variables: {
          id_device: id_device,
          table_pointer: table_pointer
        },
        fetchPolicy: 'network-only'
      })
      .pipe(map((result: any) => result.data.historicData))
  }
}
