import { table } from "console"
import pool from "../database"

export async function getParameterById(id_parameter: string): Promise<any> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM PARAMETERS WHERE id_parameter = $1',
      [id_parameter]
    )
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function getDataByTablePointerAndCollectedDate (table_pointer: string, collected_at_utc: string): Promise<any> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      `SELECT * FROM ${table_pointer} WHERE COLLECTED_AT_UTC = $1`,
      [collected_at_utc]
    )
    return result.rows
  } finally {
    client.release()
  }
}