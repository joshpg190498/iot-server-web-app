import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, Login } from 'src/app/core/interfaces/login.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { GraphQLErrorHandlerService } from 'src/app/core/services/graphql-error-handler.service';
import { ToastService } from 'src/app/core/services/toast.service';

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
    private _toastService: ToastService,
    private _gqlErrorHandlerService: GraphQLErrorHandlerService
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
        this._authService.setToken(token)
        this._toastService.openToast('Credenciales correctas', 'success', 3000)
        this.isLogin = false
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        this._gqlErrorHandlerService.handleGraphQLError(error)
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
}
