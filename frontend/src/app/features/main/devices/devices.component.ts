import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Device } from 'src/app/core/interfaces/device.interface';
import { DeviceService } from 'src/app/core/services/device.service';
import { MatDialog } from '@angular/material/dialog';
import { UpsertDeviceDialogComponent } from './components/upsert-device-dialog.component';
import { SettingsDeviceDialogComponent } from './components/settings-device-dialog.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { GraphQLErrorHandlerService } from 'src/app/core/services/graphql-error-handler.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  displayedColumns = ['nro', 'id_device', 'description', 'active', 'actions']
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
        this.devices = devices.map((e: any, i: number) => ({
          ...e,
          position: i+1
        }))
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

  openSettingsDialog(device?: Device): void {
    const dialogRef = this.dialog.open(SettingsDeviceDialogComponent, {
      width: '80vw',
      data: {
        id_device: device ? device.id_device : null
      } as Device,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.success) {
          this._toastService.openToast(`Parámetros del equipo ${result.id_device} configurado correctamente`, 'success', 3000)
        } else {
          this._toastService.openToast(`Error al configurar parámetros. Inténtelo más tarde`, 'error', 3000)
        }
      }
    });
  }

  openUpsertDialog(isEditMode: boolean, device?: Device): void {
    const dialogRef = this.dialog.open(UpsertDeviceDialogComponent, {
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
