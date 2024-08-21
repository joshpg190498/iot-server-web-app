import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from '../interfaces/permission.interface';
import { User, UserInput } from '../interfaces/user.interface';

const GET_USERS_QUERY = gql`
  query users {
    users {
      id
      username
      email
      first_name
      last_name
      active
      id_role
      role
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
      username
      email
      first_name
      last_name
      active
      id_role
      role
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: Int!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
      email
      first_name
      last_name
      active
      id_role
      role
    }
  }
`

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private apollo: Apollo) {}

  getUsers(): Observable<User[]> {
    return this.apollo
      .watchQuery<{ users: User[] }>({
        query: GET_USERS_QUERY
      })
      .valueChanges.pipe(map((result: any) => result.data.users))
  }

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
      .valueChanges.pipe(map((result: any) => result.data.permissions));
  }

  createUser(form: UserInput): Observable<User> {
    return this.apollo
      .mutate<{ createUser: UserInput }>({
        mutation: CREATE_USER_MUTATION,
        variables: {
          input: form
        },
        refetchQueries: [
          {
            query: GET_USERS_QUERY
          }
        ]
      })
      .pipe(map((result: any) => result.data?.createUser  ?? {} as User))
  }

  updateUser(id: number, form: UserInput): Observable<User> {
    return this.apollo
      .mutate<{ updateUser: UserInput }>({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          id: id,
          input: form
        },
        refetchQueries: [
          {
            query: GET_USERS_QUERY
          }
        ]
      })
      .pipe(map((result: any) => result.data?.createUser  ?? {} as User))
  }
}
