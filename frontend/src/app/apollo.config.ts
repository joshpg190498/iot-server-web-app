// src/app/apollo.config.ts
import { ApolloLink, InMemoryCache, split } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { NgModule } from '@angular/core'
import { provideHttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { setContext } from '@apollo/client/link/context'
import { Kind, OperationTypeNode } from 'graphql'
import { getMainDefinition } from '@apollo/client/utilities'

const uri = environment.api.uri
const wsUri = environment.api.wsUri

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

  const http = httpLink.create({ uri })
  const ws = new GraphQLWsLink(
    createClient({
      url: wsUri,
    }),
  )

  const link = split(
    ({ query }: { query: any }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === Kind.OPERATION_DEFINITION &&
        definition.operation === OperationTypeNode.SUBSCRIPTION
      );
    },
    ws,
    http,
  )

  return {
    link: ApolloLink.from([authLink, link]),
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
