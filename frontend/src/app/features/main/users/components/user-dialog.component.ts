import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, IUser } from 'src/app/core/interfaces/user.interface';
import { Role } from 'src/app/core/interfaces/role.interface';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['../users.component.scss']
})
export class UserDialogComponent {
  userForm: FormGroup;
  roles: Role[] = []

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      username: [{ value: data.username, disabled: data.isEditMode}, Validators.required],
      email: [{ value: data.email, disabled: data.isEditMode}, Validators.required],
      first_name: [data.first_name, Validators.required],
      last_name: [data.last_name, Validators.required],
      id_role: [data.id_role, Validators.required]
    });
    this.roles = data.roles
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.userForm.valid) return
    const loginFormData = this.createUserForm()
    this.dialogRef.close(loginFormData);
  }

  createUserForm(): IUser {
    return {
      ...new User(),
      id: this.data.id,
      username: this.userForm.get(['username'])!.value,
      email: this.userForm.get(['email'])!.value,
      first_name: this.userForm.get(['first_name'])!.value,
      last_name: this.userForm.get(['last_name'])!.value,
      id_role: this.userForm.get(['id_role'])!.value,
      active: this.data.active,
      isEditMode: this.data.isEditMode
    }
  }
}
