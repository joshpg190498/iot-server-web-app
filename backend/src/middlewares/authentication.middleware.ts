import jwt from 'jsonwebtoken'
import config from '../config'
import { GraphQLError } from 'graphql'
import { publicOperations } from './authentication.utility'

export const authenticationMiddleware = async (req: any) => {
  const token = req.headers.authorization || ''
  const operationName = req.body.operationName
  if (publicOperations.includes(operationName)) {
    return null  
  }
  if (!token) {
    throw new GraphQLError('No authenticated', {
      extensions: {
        code: 'AUTHENTICATION_ERROR',
        message: 'No token in request'
      }
    })
  }
  try {
    const user = jwt.verify(token.split(' ')[1], config.jwt.secretKey) 
    return user
  } catch (err: any) {
    throw new GraphQLError('Invalid or expired token', {
      extensions: {
        code: 'AUTHENTICATION_ERROR',
        message: err.message
      }
    })
  }
}

export default authenticationMiddleware
