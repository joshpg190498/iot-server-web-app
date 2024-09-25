import { getCpuTemperatureByIdDeviceService, getCpuUsageByIdDeviceService, getDevicesService, getDiskUsageByIdDeviceService, getLoadAverageByIdDeviceService, getNetworkStatsByIdDeviceService, getRamUsageByIdDeviceService } from "../services/dashboard.service"

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

export async function getCpuUsageByIdDeviceController (_: any, args: any) {
  try {
    const data = await getCpuUsageByIdDeviceService(args.id_device)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getDiskUsageByIdDeviceController (_: any, args: any) {
  try {
    const data = await getDiskUsageByIdDeviceService(args.id_device)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getLoadAverageByIdDeviceController (_: any, args: any) {
  try {
    const data = await getLoadAverageByIdDeviceService(args.id_device)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getNetworkStatsByIdDeviceController (_: any, args: any) {
  try {
    const data = await getNetworkStatsByIdDeviceService(args.id_device)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getDashboardDeviceDataByIdDeviceController (_: any, args: any) {
  try {
    const [ramUsage, cpuTemperature, cpuUsage, diskUsage, loadAverage, networkStats] = await Promise.all([
      getRamUsageByIdDeviceService(args.id_device),
      getCpuTemperatureByIdDeviceService(args.id_device),
      getCpuUsageByIdDeviceService(args.id_device),
      getDiskUsageByIdDeviceService(args.id_device),
      getLoadAverageByIdDeviceService(args.id_device),
      getNetworkStatsByIdDeviceService(args.id_device)
    ])
    return {
      ramUsage,
      cpuTemperature,
      cpuUsage,
      diskUsage,
      loadAverage,
      networkStats
    }
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

