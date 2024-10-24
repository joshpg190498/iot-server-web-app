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

export async function getDashboardDeviceDataRTByIdDeviceController (_: any, args: any) {
  try {
    const endTime = new Date()
    const startTime = new Date(endTime.getTime() - 60 * 60 * 1000)
    const [ramUsage, cpuTemperature, cpuUsage, diskUsage, loadAverage, networkStats] = await Promise.all([
      getRamUsageByIdDeviceService(args.id_device, startTime, endTime),
      getCpuTemperatureByIdDeviceService(args.id_device, startTime, endTime),
      getCpuUsageByIdDeviceService(args.id_device, startTime, endTime),
      getDiskUsageByIdDeviceService(args.id_device, startTime, endTime),
      getLoadAverageByIdDeviceService(args.id_device, startTime, endTime),
      getNetworkStatsByIdDeviceService(args.id_device, startTime, endTime)
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

