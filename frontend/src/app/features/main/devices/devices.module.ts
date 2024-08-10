import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DevicesRoutingModule } from './devices-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevicesComponent } from './devices.component';
import { MaterialModule } from 'src/app/material.module';
import { DeviceDialogComponent } from './components/device-dialog.component';


@NgModule({
  declarations: [DevicesComponent, DeviceDialogComponent],
  imports: [
    IonicModule,
    CommonModule,
    DevicesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class DevicesModule { }
