import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device, IDevice } from 'src/app/core/interfaces/device.interface';

@Component({
  selector: 'app-device-dialog',
  templateUrl: './upsert-device-dialog.component.html',
  styleUrls: ['../devices.component.scss']
})
export class UpsertDeviceDialogComponent {
  deviceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpsertDeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private fb: FormBuilder
  ) {
    this.deviceForm = this.fb.group({
      id_device: [{ value: data.id_device, disabled: data.isEditMode }, Validators.required],
      description: [data.description, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.deviceForm.valid) return
    const loginFormData = this.createDeviceForm()
    this.dialogRef.close(loginFormData);
  }

  createDeviceForm(): IDevice {
    return {
      ...new Device(),
      id: this.data.id,
      id_device:  this.deviceForm.get(['id_device'])!.value,
      description: this.deviceForm.get(['description'])!.value,
      active: this.data.active,
      isEditMode: this.data.isEditMode
    }
  }
}
