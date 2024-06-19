import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent  implements OnInit {

  userPermissions: any = []

  constructor(
    private router: Router,
    private menu: MenuController,
    private _userService: UserService,
    private _authService: AuthService
  ) { }

  ngOnInit(
  ) {
    const userData = this._authService.getUserData()
    this.getPermissions(userData.id)
  }

  logout() {
    sessionStorage.removeItem('token')
    this.router.navigate(['/auth'])
  }

  getPermissions(id: number) {
    this._userService.getPermissionsByUserId(id).subscribe(
      (permissions) => {
        console.log('Permissions:', permissions);
        this.userPermissions = permissions
        /* this._authService.setToken(token)
        this.setOpenToast(true, 'Crendenciales correctas', 'primary')
        this.isLogin = false
        this.router.navigate(['/users']) */
      },
      (error) => {
        let message = error.message
        if (error.graphQLErrors) {
          console.error('Error logging in:', error.graphQLErrors);
          message = error.graphQLErrors[0].message
        }
      }
    );
  }

}
