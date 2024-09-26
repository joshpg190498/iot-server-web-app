import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Device } from 'src/app/core/interfaces/device.interface';
import { DeviceService } from 'src/app/core/services/device.service';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDialogComponent } from './components/device-dialog.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { GraphQLErrorHandlerService } from 'src/app/core/services/graphql-error-handler.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['../../../layouts/main-layout/main-layout.component.scss','./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  displayedColumns = ['id_device', 'description', 'active', 'actions']
  devices: Device[] = []
  dataSource = new MatTableDataSource<any>(this.devices)
  @ViewChild(MatPaginator) paginator!: MatPaginator

  //deviceForm: FormGroup
  isEditMode = false
  editDeviceId: number | null = null
  isModalOpen = false

  constructor(
    private _deviceService: DeviceService,
    public dialog: MatDialog,
    private _toastService: ToastService,
    private _gqlErrorHandlerService: GraphQLErrorHandlerService
  ) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.getDevices()
  }

  getDevices() {
    this._deviceService.getDevices().subscribe(
      (devices: any) => {
        console.log('devices:', devices)
        this.devices = devices
        this.dataSource.data = this.devices
        this.dataSource.paginator = this.paginator
      },
      (error: any) => {
        let message = error.message
        if (error.graphQLErrors) {
          console.error('Error logging in:', error.graphQLErrors)
          message = error.graphQLErrors[0].message
        }
      }
    )
  }

  showCreateForm() {
    this.isEditMode = false
    //this.deviceForm.reset()
    this.openEditModal()
  }

  async openEditModal() {
    this.isModalOpen = true
  }

  closeEditModal() {
    this.isModalOpen = false
  }

  deleteDevice(id: number) {
    this._deviceService.deleteDevice(id).subscribe(
      (device: any) => {
        console.log('device:', device)
        if (device) this._toastService.openToast('Dispositivo eliminado correctamente', 'success', 3000)
      },
      (error: any) => {
        this._gqlErrorHandlerService.handleGraphQLError(error)
      }
    )
  }

  openDialog(isEditMode: boolean, device?: Device): void {
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      width: '300px',
      data: {
        id: device ? device.id : null,
        description: device ? device.description : '',
        isEditMode: isEditMode
      } as Device,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (isEditMode && device) {
          this.updateDevice(result)
        } else {
          this.createDevice(result)
        }
      }
    });
  }

  createDevice(form: Device) {
    this._deviceService.createDevice(form).subscribe(
      (device: any) => {
        console.log('device:', device)
        this._toastService.openToast('Dispositivo creado correctamente', 'success', 3000)
      },
      (error: any) => {
        this._gqlErrorHandlerService.handleGraphQLError(error)
      }
    )
  }

  updateDevice(form: Device) {
    this._deviceService.updateDevice(form).subscribe(
      (device: any) => {        
        this._toastService.openToast('Dispositivo editado correctamente', 'success', 3000)
        console.log('device:', device)
      },
      (error: any) => {
        this._gqlErrorHandlerService.handleGraphQLError(error)
      }
    )
  }

}
