import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserInput } from 'src/app/core/interfaces/user.interface'
import { UserService } from 'src/app/core/services/user.service';
import { RoleService } from 'src/app/core/services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserDialogComponent } from './components/user-dialog.component';
import { Role } from 'src/app/core/interfaces/role.interface';
import { GraphQLErrorHandlerService } from 'src/app/core/services/graphql-error-handler.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent  implements OnInit {
  displayedColumns = ['nro', 'username', 'email', 'first_name', 'last_name', 'active', 'role', 'actions']
  users: User[] = []
  roles: Role[] = []
  dataSource: any[] = []  
  @ViewChild(MatPaginator) paginator!: MatPaginator
  currentUserData: any
  currentLoggedUserData: any

  isEditMode = false
  editUserId: number | null = null
  isModalOpen = false
  pageSize: number = 10
  pageIndex: number = 0

  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    public dialog: MatDialog,
    private _gqlErrorHandlerService: GraphQLErrorHandlerService,
    private _toastService: ToastService,
    private _authService: AuthService
  ) {
    this.currentLoggedUserData = this._authService.getUserData()
  }

  ngOnInit() {
    this.getUsers()
    this.getRoles()
    this.checkCurrentUser()
  }

  checkCurrentUser() {
    this.currentUserData = this._authService.getUserData()
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      (result: any) => {
        this.users = result
        this.updateDataSource()
      }, 
      (error: any) => {
        this._gqlErrorHandlerService.handleGraphQLError(error)
      }
    )
  }

  getRoles() {
    this._roleService.getRoles().subscribe(
      (roles: any) => {
        this.roles = roles
      }, 
      (error: any) => {
        this._gqlErrorHandlerService.handleGraphQLError(error)
      }
    )
  }

  showCreateForm() {
    this.isEditMode = false
    //this.userForm.reset()
    this.openEditModal()
  }

  async openEditModal() {
    this.isModalOpen = true
  }

  closeEditModal() {
    this.isModalOpen = false
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe(
      (user: any) => {
        this._toastService.openToast('Usuario eliminado correctamente', 'success', 3000)

      },
      (error: any) => {
        this._gqlErrorHandlerService.handleGraphQLError(error)
      }
    );
  }

  openDialog(isEditMode: boolean, user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '300px',
      data: {
        id: user ? user.id : null,
        username: user ? user.username : '',
        email: user ? user.email : '',
        first_name: user ? user.first_name : '',
        last_name: user ? user.last_name : '',
        id_role: user ? user.id_role : '',
        role: user? user.role : '',
        isEditMode: isEditMode,
        roles: this.roles
      } as User,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (isEditMode && user) {
          this.updateUser(result.id, result.input)
        } else {
          this.createUser(result.input)
        }
      }
    });
  }

  createUser(form: UserInput) {
    this._userService.createUser(form).subscribe(
      (user: any) => {
        this._toastService.openToast('Usuario creado correctamente', 'success', 3000)
      },
      (error: any) => {
        this._gqlErrorHandlerService.handleGraphQLError(error)
      }
    );
  }

  updateUser(id: number, form: UserInput) {
    this._userService.updateUser(id, form).subscribe(
      (user: any) => {
        this._toastService.openToast('Usuario editado correctamente', 'success', 3000)
        if(id == this.currentLoggedUserData.id) {
          window.location.href = '/auth'
        }
      },
      (error: any) => {
        this._gqlErrorHandlerService.handleGraphQLError(error)
      }
    );
  }

    updateDataSource() {
      const startIndex = this.pageIndex * this.pageSize
      const endIndex = startIndex + this.pageSize
      this.dataSource = this.users.slice(startIndex, endIndex).map((item: any, index: any) => ({
        ...item,
        position: startIndex + index + 1
      }))
    }
  
    onPageChange(event: PageEvent) {
      this.pageIndex = event.pageIndex 
      this.pageSize = event.pageSize
      this.updateDataSource()
    }
}
