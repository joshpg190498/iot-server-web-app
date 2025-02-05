import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../interfaces/role.interface';

const GET_ROLES_QUERY = gql`
  query roles {
    roles {
      id
      role_name
      description
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(private apollo: Apollo) {}

  getRoles(): Observable<Role[]> {
    return this.apollo
      .query<{ roles: Role[] }>({
        query: GET_ROLES_QUERY,
        fetchPolicy: 'network-only'
      })
      .pipe(map((result: any) => result.data.roles))
  }
}
