import { loginService } from "../services/auth.service"

export async function loginController (_: any, args: any) {
  try {
    const data = await loginService(args.email, args.password)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}
