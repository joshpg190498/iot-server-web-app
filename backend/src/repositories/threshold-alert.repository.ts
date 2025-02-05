import pool from "../database"
import { ThresholdAlert } from "../interfaces/threshold-alert.interface"

export async function getThresholdAlertDataByIdDeviceRepository(
  id_device: string,
  id_parameter: string
): Promise <ThresholdAlert[]> {
  const client = await pool.connect()
  try {
    let query = `
      SELECT *
        FROM THRESHOLD_ALERTS
      WHERE id_device = $1 AND id_parameter = $2
      ORDER BY created_at_utc DESC`
    const result = await client.query(query, [id_device, id_parameter])
    return result.rows
  } finally {
    client.release()
  }
}
