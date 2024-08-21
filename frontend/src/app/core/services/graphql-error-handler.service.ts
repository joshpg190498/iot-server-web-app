import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class GraphQLErrorHandlerService {
  constructor(private _toastService: ToastService) {}

  handleGraphQLError(error: any): void {
    console.log(error.graphQLErrors, error.networkError)
    let errorMessage = 'Ocurrió un error';
    if (error.graphQLErrors.length > 0) {
      errorMessage = error.graphQLErrors.map((err: any) => err.message).join(', ');
    } else if (error.networkError) {
      if (error.networkError.error?.errors?.length > 0) {
        if (error.networkError.error?.errors[0].extensions?.code == 'AUTHENTICATION_ERROR') {
          
        }

        if (error.networkError.error?.errors[0].extensions?.code == 'AUTHORIZATION_ERROR') {
          
        }
        error.networkError.error?.errors[0].message
      } else {
        errorMessage = 'Error de red: ' + error.networkError.message;
      }

    } else {
      errorMessage = error.message ? error.message : errorMessage;
    }

    this._toastService.openToast(errorMessage, 'error', 30000);
  }
}
