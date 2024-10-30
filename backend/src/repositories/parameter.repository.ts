import pool from "../database"
import { Parameter } from "../interfaces/parameter.interface"

export async function getHourlyParametersRepository(): Promise<Parameter[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`SELECT * FROM PARAMETERS WHERE HAS_THRESHOLD = TRUE`)
    return result.rows
  } finally {
    client.release()
  }
}

export async function getParametersRepository(): Promise<Parameter[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`SELECT * FROM PARAMETERS`)
    return result.rows
  } finally {
    client.release()
  }
}