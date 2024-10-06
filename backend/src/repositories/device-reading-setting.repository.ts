import { randomBytes } from "crypto"
import pool from "../database"
import { DeviceReadingSetting, DeviceReadingInput } from "../interfaces/device-reading-setting.interface"

export async function getDeviceReadingSettingsRepository(): Promise<DeviceReadingSetting[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`SELECT * FROM DEVICE_READING_SETTINGS`)
    return result.rows
  } finally {
    client.release()
  }
}

export async function getDeviceReadingSettingsByIdDeviceRepository(id_device: string): Promise<DeviceReadingSetting[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT  drs.id, drs.id_device, drs.parameter, drs.period, drs.active, drs.threshold_value, 
        p.has_threshold, p.description 
        FROM DEVICE_READING_SETTINGS drs
        INNER JOIN PARAMETERS p
        ON drs.parameter = p.id_parameter
      WHERE id_device = $1`, [id_device])
    return result.rows
  } finally {
    client.release()
  }
} 

export async function updateDeviceReadingSettingsRepository(id_device: string, settings: DeviceReadingInput[]): Promise <DeviceReadingSetting[]> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    for (const el of settings) {
      await client.query(`
        UPDATE DEVICE_READING_SETTINGS SET period = $1, active = $2, threshold_value = $3 WHERE id_device = $4 and parameter = $5 
      `, [el.period, el.active, el.threshold_value, id_device, el.parameter])
    }

    const hashUpdate = randomBytes(6).toString('hex')
    const createDateTimeUtc = new Date()
    const deviceUpdateResult = await client.query(
      'INSERT INTO DEVICE_UPDATES (id_device, hash_update, id_type, creation_datetime_utc) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_device, hashUpdate, 'update', createDateTimeUtc]
    ) 
    const newUpdate = deviceUpdateResult.rows[0]
    await client.query('COMMIT')
    return newUpdate
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}