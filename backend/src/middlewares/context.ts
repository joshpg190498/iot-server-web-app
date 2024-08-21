import authenticationMiddleware from "./authentication.middleware"
import authorizationMiddleware from "./authorization.middleware"

export const buildContext = async ({ req }: {req: any}) => {
  const user = await authenticationMiddleware(req)
  if(user) {
    await authorizationMiddleware(user, req)
    return { user }
  }
  return {}
}

export default buildContext
