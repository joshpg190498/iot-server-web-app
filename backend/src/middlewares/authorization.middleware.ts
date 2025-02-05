import { GraphQLError } from 'graphql'
import { authOperations } from './authorization.utility'

export const authorizationMiddleware = async (user: any, req: any) => {
  const operationName: string = req.body.operationName  || ''
  const operationList  = Object.keys(authOperations)
  if (!operationList.includes(operationName)) {
    throw new GraphQLError('Undefined action', {
      extensions: {
        code: 'AUTHORIZATION_ERROR',
        message: 'Undefined action'
      }
    })  
  }

  const roleList = authOperations[operationName]

  if(!roleList.includes(user.id_role)) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'AUTHORIZATION_ERROR',
        message: 'Unauthorized'
      }
    })
  }
}

export default authorizationMiddleware
