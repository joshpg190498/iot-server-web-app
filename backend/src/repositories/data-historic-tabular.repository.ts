import pool from "../database"

export async function getHistoricDataRepository(
  id_device: string,
  table_pointer: string,
  startTime: any = null,
  endTime: any = null
): Promise <any> {
  const client = await pool.connect()
  try {
    let query = `
      SELECT *
        FROM ${table_pointer}
      WHERE id_device = $1
    `
    const queryParams: any[] = [id_device]
    if (startTime && endTime) {
      query += ` AND collected_at_utc BETWEEN $2 AND $3`
      queryParams.push(startTime, endTime)
    }
    query += ` ORDER BY collected_at_utc DESC`
    const result = await client.query(query, queryParams)
    return result.rows
  } finally {
    client.release()
  }
}

export async function getHourlyHistoricDataByIdDeviceRepository(
  id_device: string,
  table_pointer: string,
  startTime: any = null,
  endTime: any = null
): Promise <any> {
  const client = await pool.connect()
  try {
    let query = `
      SELECT *
        FROM ${table_pointer}_HOURLY
      WHERE id_device = $1
    `
    const queryParams: any[] = [id_device]
    if (startTime && endTime) {
      query += ` AND start_time BETWEEN $2 AND $3`
      queryParams.push(startTime, endTime)
    }
    query += ` ORDER BY start_time DESC`
    const result = await client.query(query, queryParams)
    return result.rows
  } finally {
    client.release()
  }
}
