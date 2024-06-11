import { DeviceReadingSettingsByIdDeviceArgs, UpdateDeviceReadingSettingsArgs } from "../interfaces/device-settings.interface"
import { getDeviceReadingSettingsByIdDeviceService, getDeviceReadingSettingsService, updateDeviceReadingSettingsService } from "../services/device-settings.service"


export async function getDeviceReadingSettingsController (_: any, __: any, context: any) {
  try {
    const data = await getDeviceReadingSettingsService()
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getDeviceReadingSettingsByIdDeviceController (_: any, args: DeviceReadingSettingsByIdDeviceArgs) {
  try {
    const data = await getDeviceReadingSettingsByIdDeviceService(args.id_device)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function updateDeviceReadingSettingsController (_: any, args: UpdateDeviceReadingSettingsArgs) {
  try {
    const data = await updateDeviceReadingSettingsService(args.id_device, args.settings)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}