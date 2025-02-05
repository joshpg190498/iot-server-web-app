import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parameter } from '../interfaces/parameter.interface';
import { ThresholdAlert } from '../interfaces/threshold-alert.interface';

const GET_PARAMETERES_QUERY = gql`
  query parameters {
    parameters {
      id_parameter
      default_period
      id_parameter
      description
      has_threshold
      default_threshold_value
    }
  }
`;

const GET_THRESHOLD_ALERT_DATA = gql`
  query thresholdAlertData($id_parameter: String!, $id_device: String!) {
    thresholdAlertData(id_parameter: $id_parameter, id_device: $id_device) {
      id
      id_device
      data
      email_sent
      created_at_utc
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ThresholdAlertService {

  constructor(private apollo: Apollo) {}

  getParameters(): Observable<Parameter[]> {
    return this.apollo
      .query<{ parameters: Parameter[] }>({
        query: GET_PARAMETERES_QUERY,
        fetchPolicy: 'network-only'
      })
      .pipe(map((result: any) => result.data.parameters))
  }

  getThresholdAlertData(id_device: string, id_parameter: string): Observable<ThresholdAlert[]> {
    return this.apollo
      .query<{ thresholdAlertData: any }>({
        query: GET_THRESHOLD_ALERT_DATA,
        variables: {
          id_device: id_device,
          id_parameter: id_parameter
        },
        fetchPolicy: 'network-only'
      })
      .pipe(map((result: any) => result.data.thresholdAlertData))
  }
}
