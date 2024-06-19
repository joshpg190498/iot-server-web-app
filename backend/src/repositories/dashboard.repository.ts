import pool from "../database"
import { Device } from "../interfaces/dashboard.interface"

export async function getDevicesRepository(): Promise<Device[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT du.id, du.id_device, du.creation_datetime_utc, du.update_datetime_utc, 
        mdi.hostname, mdi.processor, mdi.ram, mdi.hostid, mdi.os, mdi.kernel, 
        mdi.collected_at_utc, mdi.inserted_at_utc 
        FROM device_updates du 
        LEFT JOIN main_device_information mdi 
        ON du.id_device = mdi.id_device
      WHERE
        du.id_type = 'startup'
      ORDER BY du.creation_datetime_utc
    `)
    console.log(result)
    return result.rows
  } finally {
    client.release()
  }
}