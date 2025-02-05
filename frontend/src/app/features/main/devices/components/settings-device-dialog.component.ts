import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Device, IDevice } from 'src/app/core/interfaces/device.interface';
import { DeviceReadingSettingService } from 'src/app/core/services/device-reading-setting';
import { DeviceReadingSetting } from 'src/app/core/interfaces/device-reading-setting.interface';
import { GraphQLErrorHandlerService } from 'src/app/core/services/graphql-error-handler.service';

@Component({
  selector: 'app-device-dialog',
  templateUrl: './settings-device-dialog.component.html',
  styleUrls: ['../devices.component.scss']
})
export class SettingsDeviceDialogComponent {
  readingSettingForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SettingsDeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _deviceReadingSettingService: DeviceReadingSettingService,
    private _gqlErrorHandlerService: GraphQLErrorHandlerService

  ) {
    this.readingSettingForm = this.fb.group({
      id_device: [{ value: data.id_device, disabled: data.isEditMode }, Validators.required],
      parameters: this.fb.array([]),
    })
    this.loadDeviceData(data.id_device)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.readingSettingForm.valid) return;
    const formData = this.readingSettingForm.value;
    this.updateDeviceReadingSettings(formData)
  }

  updateDeviceReadingSettings(form: any) {
    this._deviceReadingSettingService.updateDeviceReadingSettings(form.id_device, form.parameters).subscribe(
      (data: any) => {
        this.dialogRef.close({success: true, id_device: form.id_device});
      },
      (error: any) => {
        this._gqlErrorHandlerService.handleGraphQLError(error)
        this.dialogRef.close({success: false, id_device: form.id_device});

      }
    )
  }

  createReadingSettingFormGroup(rs: any): FormGroup {
    return this.fb.group({
      description: [rs.description],
      parameter: [rs.parameter],
      period: [rs.period, Validators.required],
      active: [rs.active],
      threshold_value: [{ value: rs.threshold_value, disabled: !rs.has_threshold }]
    });
  }

  loadDeviceData(id_device: string): void {
    this._deviceReadingSettingService.getDeviceReadingSettings(id_device)
      .subscribe((data: any) => {
        const parametersArray = this.readingSettingForm.get('parameters') as FormArray;
        parametersArray.clear()

        data.forEach((param: DeviceReadingSetting) => {
          parametersArray.push(this.createReadingSettingFormGroup(param))
        });
      })
  }

  get parametersFormArray(): FormArray {
    return this.readingSettingForm.get('parameters') as FormArray
  }
}
