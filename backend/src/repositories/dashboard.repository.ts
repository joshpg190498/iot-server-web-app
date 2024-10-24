import pool from "../database"
import { CpuTemperature, CpuUsage, Device, DiskUsage, LoadAverage, NetworkStats, RamUsage } from "../interfaces/dashboard.interface"

export async function getDevicesRepository(): Promise<Device[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT du.id, du.id_device, du.creation_datetime_utc, du.update_datetime_utc, 
        mdi.hostname, mdi.processor, mdi.ram, mdi.hostid, mdi.os, mdi.kernel, mdi.cpu_count, 
        mdi.collected_at_utc, mdi.inserted_at_utc 
        FROM device_updates du 
        LEFT JOIN main_device_information mdi 
        ON du.id_device = mdi.id_device
      WHERE
        du.id_type = 'startup'
      ORDER BY du.creation_datetime_utc
    `)
    return result.rows
  } finally {
    client.release()
  }
}

export async function getRamUsageByIdDeviceRepository(
  id_device: string,
  startTime: any = null,
  endTime: any = null
): Promise <RamUsage[]> {
  const client = await pool.connect()
  try {
    let query = `
      SELECT *
        FROM ram_usage
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

export async function getCpuTemperatureByIdDeviceRepository(
  id_device: string,
  startTime: any = null,
  endTime: any = null
): Promise <CpuTemperature[]> {
  const client = await pool.connect()
  try {
    let query = `
      SELECT *
        FROM cpu_temperature
      WHERE id_device = $1
    `
    const queryParams: any[] = [id_device]
    if (startTime && endTime) {
      query += ` AND collected_at_utc BETWEEN $2 AND $3`
      queryParams.push(startTime, endTime)
    }
    query += ` ORDER BY collected_at_utc DESC, sensor_key DESC`
    const result = await client.query(query, queryParams)
    return result.rows
  } finally {
    client.release()
  }
}

export async function getCpuUsageByIdDeviceRepository(
  id_device: string,
  startTime: any = null,
  endTime: any = null
): Promise <CpuUsage[]> {
  const client = await pool.connect()
  try {
    let query = `
      SELECT *
        FROM cpu_usage
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

export async function getDiskUsageByIdDeviceRepository(
  id_device: string,
  startTime: any = null,
  endTime: any = null
): Promise <DiskUsage[]> {
  const client = await pool.connect()
  try {
    let query = `
      SELECT *
        FROM disk_usage
      WHERE id_device = $1
    `
    const queryParams: any[] = [id_device]
    if (startTime && endTime) {
      query += ` AND collected_at_utc BETWEEN $2 AND $3`
      queryParams.push(startTime, endTime)
    }
    query += ` ORDER BY collected_at_utc DESC, disk_name DESC`
    const result = await client.query(query, queryParams)
    return result.rows
  } finally {
    client.release()
  }
}

export async function getLoadAverageByIdDeviceRepository(
  id_device: string,
  startTime: any = null,
  endTime: any = null
): Promise <LoadAverage[]> {
  const client = await pool.connect()
  try {
    let query = `
      SELECT *
        FROM load_average
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

export async function getNetworkStatsByIdDeviceRepository(
  id_device: string,
  startTime: any = null,
  endTime: any = null
): Promise <NetworkStats[]> {
  const client = await pool.connect()
  try {
    let query = `
      SELECT *
        FROM network_stats
      WHERE id_device = $1
    `
    const queryParams: any[] = [id_device]
    if (startTime && endTime) {
      query += ` AND collected_at_utc BETWEEN $2 AND $3`
      queryParams.push(startTime, endTime)
    }
    query += ` ORDER BY collected_at_utc DESC, interface_name DESC`
    const result = await client.query(query, queryParams)
    return result.rows
  } finally {
    client.release()
  }
}

