import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  jwtHelper: any = new JwtHelperService()

  constructor(private apollo: Apollo) {}

  login(formData: Login): Observable<string> {
    const LOGIN_QUERY = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password)
      }
    `;

    return this.apollo
      .watchQuery<any>({
        query: LOGIN_QUERY,
        variables: formData,
      })
      .valueChanges.pipe(map((result: any) => result.data.login));
  }

  setToken(token: string): any {
    sessionStorage.setItem('token', token)
  }

  getUserData(): any {
    const token = sessionStorage.getItem('token')
    const parsedToken = this.jwtHelper.decodeToken(token)
    return parsedToken
  }

  checkTokenExpiration(): any {
    const token = sessionStorage.getItem('token')
    const isExpired = this.jwtHelper.isTokenExpired(token)
    return isExpired
  }

  isAuthenticated(): boolean {
    try {
      const isTokenExpired = this.checkTokenExpiration()
      return !isTokenExpired
    } catch (err){
      console.error(err)
      return false
    }
  }
}
