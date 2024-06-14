import pool from "../database"
import { Device, DeviceInput, DeviceUpdate } from "../interfaces/device.interface"
import { randomBytes } from "crypto"

export async function getDevicesRepository(): Promise<Device[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`SELECT * FROM DEVICES`)
    console.log(result)
    return result.rows
  } finally {
    client.release()
  }
}

export async function getDeviceByIdRepository(id: number): Promise<Device> {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT id, id_device, description, active FROM DEVICES WHERE id = $1', [id])
    return result.rows[0]
  } finally {
    client.release()
  }
} 

export async function createDeviceRepository(input: DeviceInput): Promise<{ newDevice: Device, newUpdate: DeviceUpdate }> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const deviceResult = await client.query(
      'INSERT INTO DEVICES (id_device, description, active) VALUES ($1, $2, $3) RETURNING *',
      [input.id_device, input.description, input.active]
    )
    const newDevice = deviceResult.rows[0]

    const parametersResult = await client.query('SELECT id_parameter, default_period, default_threshold_value FROM PARAMETERS')
    const parameters = parametersResult.rows

    for (const el of parameters) {
      await client.query(
        'INSERT INTO DEVICE_READING_SETTINGS (id_device, parameter, period, threshold_value) VALUES ($1, $2, $3, $4)',
        [newDevice.id_device, el.id_parameter, el.default_period, el.default_threshold_value]
      )
    }

    const hashUpdate = randomBytes(6).toString('hex')
    const createDateTimeUtc = new Date()
    const deviceUpdateResult = await client.query(
      'INSERT INTO DEVICE_UPDATES (id_device, hash_update, type, creation_datetime_utc) VALUES ($1, $2, $3, $4) RETURNING *',
      [newDevice.id_device, hashUpdate, 'startup', createDateTimeUtc]
    ) 
    const newUpdate = deviceUpdateResult.rows[0]
    await client.query('COMMIT')
    return {
      newDevice,
      newUpdate
    }
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}


export async function updateDeviceRepository(id: number, input: DeviceInput): Promise<Device> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'UPDATE DEVICES SET id_device = $1, description = $2, active = $3 WHERE id = $4 RETURNING *',
      [input.id_device, input.description, input.active, id]
    )
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function deleteDeviceRepository(id: number): Promise<boolean> {
  const client = await pool.connect()
  try {
    await client.query('DELETE FROM DEVICES WHERE id = $1', [id])
    return true
  } catch(err) {
    console.error(err)
    return false
  } finally {
    client.release()
  }
}