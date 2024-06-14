export interface Device {
  id: number
  id_device: string
  description: string | null
  state: boolean
}

export interface DeviceInput {
  id_device: string
  description: string | null
  active: boolean
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
  input: DeviceInput
}

export interface UpdateDeviceArgs {
  id: number
  input: DeviceInput
}

export interface DeleteDeviceArgs {
  id: number
}