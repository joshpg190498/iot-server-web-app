import { getRolesService } from "../services/role.service"

export async function getRolesController (_: any, __: any, context: any) {
  try {
    const data = await getRolesService()
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}
