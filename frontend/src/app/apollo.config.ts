// src/app/apollo.config.ts
import { ApolloLink, InMemoryCache } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { NgModule } from '@angular/core'
import { provideHttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const uri = environment.api.uri

export function createApollo(httpLink: HttpLink) {

  const authLink = setContext((operation, context) => {
    const token = sessionStorage.getItem('token') 

    const publicOperations = ['login']
  
    const isPublicOperation = publicOperations.some((op: any) => 
      operation.operationName && operation.operationName === op
    )
    if (isPublicOperation) return {}

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  return {
    link: ApolloLink.from([authLink, httpLink.create({ uri })]),
    cache: new InMemoryCache(),
  }
}

@NgModule({
  imports: [ApolloModule],
  providers: [
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
