import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent  implements OnInit {
  userData: any
  userPermissions: any = []

  constructor(
    private _userService: UserService,
    private _authService: AuthService
  ) { 
     this.userData = this._authService.getUserData()
  }

  ngOnInit(
  ) {
    this.getPermissions(this.userData.id)
  }

  logout() {
    sessionStorage.removeItem('token')
    window.location.href = '/auth'
  }

  getPermissions(id: number) {
    this._userService.getPermissionsByUserId(id).subscribe(
      (permissions: any) => {
        this.userPermissions = permissions
      },
      (error: any) => {
        let message = error.message
        if (error.graphQLErrors) {
          console.error('Error logging in:', error.graphQLErrors);
          message = error.graphQLErrors[0].message
        }
      }
    );
  }

}
