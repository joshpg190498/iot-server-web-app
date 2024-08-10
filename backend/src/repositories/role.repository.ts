import pool from "../database"
import { Role } from "../interfaces/role.interface"

export async function getRolesRepository(): Promise<Role[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`SELECT * FROM ROLES`)
    console.log(result)
    return result.rows
  } finally {
    client.release()
  }
}