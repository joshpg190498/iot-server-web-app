import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, Login } from 'src/app/core/interfaces/login.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  loginForm: FormGroup
  isLogin: boolean = false
  isToastOpen: boolean = false
  toastMessage: string = 'Credenciales incorrectas'
  toastColor: string = 'danger'

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  ngOnInit() {
    sessionStorage.removeItem('token')
  }

  login() {
    if (!this.loginForm.valid) return
    const loginFormData = this.createLoginForm()
    this.isLogin = true
    this._authService.login(loginFormData).subscribe(
      (token) => {
        console.log('Token:', token);
        this._authService.setToken(token)
        this.setOpenToast('Crendenciales correctas', 'success')
        this.isLogin = false
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        let message = error.message
        if (error.graphQLErrors) {
          console.error('Error logging in:', error.graphQLErrors);
          message = error.graphQLErrors[0].message
        }
        this.setOpenToast(message, 'error')
        this.isLogin = false
      }
    );
  }

  createLoginForm(): ILogin {
    return {
      ...new Login(),
      email: this.loginForm.get(['email'])!.value,
      password: this.loginForm.get('password')!.value
    }
  }

  setOpenToast(message?: string, color?: string) {
    this._snackBar.open(message || '', '', {
      duration: 3000,
      panelClass: `snackbar-${color}`
    });
  }
}
