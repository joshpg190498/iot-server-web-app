export interface Device {
  id: number
  id_device: string
  description: string | null
  state: boolean
}

export interface DeviceUpdate {
  id: number
  id_device: string
  hash_update: string
  type: string
  creation_datetime_utc: Date
}

export interface DeviceByIdArgs {
  id: number
}

export interface CreateDeviceArgs {
  id_device: string,
  description: string
}

export interface UpdateDeviceArgs {
  id: number
  description: string
}

export interface DeleteDeviceArgs {
  id: number
}