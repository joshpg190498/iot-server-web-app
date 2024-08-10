import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Device } from '../interfaces/device.interface';

const GET_DEVICES_QUERY = gql`
  query devices {
    devices {
      id
      id_device
      description
      active
    }
  }
`;

const CREATE_DEVICE_MUTATION = gql`
  mutation createDevice($id_device: String!, $description: String!) {
    createDevice(id_device: $id_device, description: $description) {
      id
      id_device
      description
      active
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  constructor(private apollo: Apollo) {}

  getDevices(): Observable<Device[]> {
    return this.apollo
      .watchQuery<{ devices: Device[] }>({
        query: GET_DEVICES_QUERY
      })
      .valueChanges.pipe(map((result: any) => result.data.devices))
  }

  createDevice(form: Device): Observable<Device> {
    return this.apollo
      .mutate<{ createDevice: Device }>({
        mutation: CREATE_DEVICE_MUTATION,
        variables: form,
        refetchQueries: [
          {
            query: GET_DEVICES_QUERY
          }
        ]
      })
      .pipe(map((result: any) => result.data?.createDevice  ?? {} as Device))
  }
}
