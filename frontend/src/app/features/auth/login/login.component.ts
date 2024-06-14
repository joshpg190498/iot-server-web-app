import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, Login } from 'src/app/core/interfaces/login.interface';
import { AuthService } from 'src/app/core/services/auth.services';

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
        this.setOpenToast(true, 'Crendenciales correctas', 'primary')
        this.isLogin = false
        this.router.navigate(['/users'])
        //this.navCtrl.navigateForward('/dashboard'); // Redirige al usuario a la página del dashboard
      },
      (error) => {
        let message = error.message
        if (error.graphQLErrors) {
          console.error('Error logging in:', error.graphQLErrors);
          message = error.graphQLErrors[0].message
        }
        this.setOpenToast(true, message, 'danger')
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

  setOpenToast(open: boolean, message?: string, color?: string) {
    this.toastMessage = message || ''
    this.toastColor = color || ''
    this.isToastOpen = open
  }
}
