import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, IUser, IUserInput, UserInput } from 'src/app/core/interfaces/user.interface';
import { Role } from 'src/app/core/interfaces/role.interface';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['../users.component.scss']
})
export class UserDialogComponent {
  passwordType: string = 'password'
  userForm: FormGroup;
  roles: Role[] = []

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      username: [{ value: data.username, disabled: data.isEditMode}, Validators.required],
      email: [{ value: data.email, disabled: data.isEditMode}, [Validators.required, Validators.email]],
      first_name: [data.first_name, Validators.required],
      last_name: [data.last_name, Validators.required],
      id_role: [data.id_role, Validators.required],
      password_hash: ['', data.isEditMode ? [] : [Validators.required]]
    });
    this.roles = data.roles
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.userForm.valid) return
    const loginFormData = this.createUserForm()
    this.dialogRef.close({
      id: this.data.id,
      input: loginFormData
    });
  }

  createUserForm(): IUserInput {
    return {
      ...new UserInput(),
      username: this.userForm.get(['username'])!.value,
      email: this.userForm.get(['email'])!.value,
      first_name: this.userForm.get(['first_name'])!.value,
      last_name: this.userForm.get(['last_name'])!.value,
      id_role: this.userForm.get(['id_role'])!.value,
      password_hash: this.userForm.get(['password_hash'])!.value
    }
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
