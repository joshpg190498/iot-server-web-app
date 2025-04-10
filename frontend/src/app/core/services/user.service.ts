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

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id)
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
        query: GET_USERS_QUERY,
        fetchPolicy: 'network-only'
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
      .query<{ permissions: Permission[] }>({
        query: GET_PERMISSIONS_QUERY,
        variables: {
          id: userId
        },
        fetchPolicy: 'network-only'
      })
      .pipe(map((result: any) => result.data.permissions));
  }

  createUser(form: UserInput): Observable<User> {
    return this.apollo
      .mutate<{ createUser: User }>({
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
      .mutate<{ updateUser: User }>({
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
      .pipe(map((result: any) => result.data?.updateUser  ?? {} as User))
  }

  deleteUser(id: number): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteUser: boolean }>({
        mutation: DELETE_USER_MUTATION,
        variables: {
          id: id
        },
        refetchQueries: [
          {
            query: GET_USERS_QUERY
          }
        ]
      })
      .pipe(map((result: any) => result.data?.deleteUser))
  }
}
