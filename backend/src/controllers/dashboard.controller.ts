import { getCpuTemperatureByIdDeviceService, getDevicesService, getRamUsageByIdDeviceService } from "../services/dashboard.service"

export async function getDevicesController (_: any, __: any, context: any) {
  try {
    const data = await getDevicesService()
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getRamUsageByIdDeviceController (_: any, args: any) {
  try {
    const data = await getRamUsageByIdDeviceService(args.id_device)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getCpuTemperatureByIdDeviceController (_: any, args: any) {
  try {
    const data = await getCpuTemperatureByIdDeviceService(args.id_device)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}