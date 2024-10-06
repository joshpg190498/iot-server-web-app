export interface DeviceReadingSetting {
  id: number
  id_device: string
  parameter: string
  period: number
  active: boolean
  threshold_value: number | null,
  has_threshold: boolean
  description: string
}

export interface DeviceReadingInput {
  parameter: number
  period: number
  active: boolean
  threshold_value: number | null
}

export interface DeviceReadingSettingsByIdDeviceArgs {
  id_device: string
}

export interface UpdateDeviceReadingSettingsArgs {
  id_device: string
  settings: DeviceReadingInput[]
}