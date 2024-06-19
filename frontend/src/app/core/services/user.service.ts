// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../interfaces/login.interface';
import { Permission } from '../interfaces/permission.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private apollo: Apollo) {}

  getPermissionsByUserId(userId: number): Observable<Permission[]> {
    const GET_PERMISSIONS_QUERY = gql`
      query permissions($id: Int!) {
        permissions(id: $id) {
          id
          permission_name
          icon
          path
          description
        }
      }
    `;

    return this.apollo
      .watchQuery<{ permissions: Permission[] }>({
        query: GET_PERMISSIONS_QUERY,
        variables: {
          id: userId
        },
      })
      .valueChanges.pipe(map((result) => result.data.permissions));
  }
}
