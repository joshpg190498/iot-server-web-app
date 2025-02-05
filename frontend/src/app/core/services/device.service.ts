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

const UPDATE_DEVICE_MUTATION = gql`
mutation updateDevice($id: Int!, $description: String!) {
  updateDevice(id: $id, description: $description) {
    id
    id_device
    description
    active
  }
}
`;

const DELETE_DEVICE_MUTATION = gql`
  mutation deleteDevice($id: Int!) {
    deleteDevice(id: $id)
  }
`

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  constructor(private apollo: Apollo) {}

  getDevices(): Observable<Device[]> {
    return this.apollo
      .watchQuery<{ devices: Device[] }>({
        query: GET_DEVICES_QUERY,
        fetchPolicy: 'network-only'
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

  updateDevice(form: Device): Observable<Device> {
    return this.apollo
      .mutate<{ updateDevice: Device }>({
        mutation: UPDATE_DEVICE_MUTATION,
        variables: form,
        refetchQueries: [
          {
            query: GET_DEVICES_QUERY
          }
        ]
      })
      .pipe(map((result: any) => result.data?.updateDevice  ?? {} as Device))
  }

  deleteDevice(id: number): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteDevice: boolean }>({
        mutation: DELETE_DEVICE_MUTATION,
        variables: {
          id: id
        },
        refetchQueries: [
          {
            query: GET_DEVICES_QUERY
          }
        ]
      })
      .pipe(map((result: any) => result.data?.deleteDevice))
  }
}
