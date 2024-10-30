import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Device } from '../interfaces/device.interface';
import { DeviceReadingSetting } from '../interfaces/device-reading-setting.interface';

const GET_READING_SETTINGS_DEVICE_QUERY = gql`
  query deviceReadingSettingsByIdDevice ($id_device: String!) {
    deviceReadingSettingsByIdDevice(id_device: $id_device) {
      id
      id_device
      parameter
      period
      active
      threshold_value
      has_threshold
      description
    }
  }
`;

const UPDATE_READING_SETTINGS_DEVICE_MUTATION = gql`
  mutation updateDeviceReadingSettings($id_device: String!, $settings: [DeviceReadingSettingInput]!) {
    updateDeviceReadingSettings(id_device: $id_device, settings: $settings)
  }
`;


@Injectable({
  providedIn: 'root',
})
export class DeviceReadingSettingService {

  constructor(private apollo: Apollo) {}

  getDeviceReadingSettings(id_device: string): Observable<DeviceReadingSetting[]> {
    return this.apollo
      .query<{ devices: DeviceReadingSetting[] }>({
        query: GET_READING_SETTINGS_DEVICE_QUERY,
        variables: {
          id_device: id_device
        }
      })
      .pipe(map((result: any) => result.data.deviceReadingSettingsByIdDevice))
  }

  updateDeviceReadingSettings(id_device: string, settings: DeviceReadingSetting[]): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: UPDATE_READING_SETTINGS_DEVICE_MUTATION,
        variables: { id_device, settings },
        refetchQueries: [
          {
            query: GET_READING_SETTINGS_DEVICE_QUERY,
            variables: { id_device }
          }
        ]
      })
      .pipe(
        map((result: any) => result.data.updateDeviceReadingSettings)
      );
  }
}
