import { Role } from "../interfaces/role.interface"
import { getRolesRepository } from "../repositories/role.repository"

export async function getRolesService(): Promise<Role[]> {
  return await getRolesRepository()
}