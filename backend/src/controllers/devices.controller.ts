import { CreateDeviceArgs, DeleteDeviceArgs, DeviceByIdArgs, UpdateDeviceArgs } from "../interfaces/devices.interface"
import { createDeviceService, deleteDeviceService, getDeviceByIdService, getDevicesService, updateDeviceService } from "../services/device.service"

export async function getDevicesController (_: any, __: any, context: any) {
  try {
    const data = await getDevicesService()
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getDeviceByIdController (_: any, args: DeviceByIdArgs) {
  try {
    const data = await getDeviceByIdService(args.id)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function createDeviceController (_: any, args: CreateDeviceArgs) {
  try {
    const data = await createDeviceService(args.input)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function updateDeviceController (_: any, args: UpdateDeviceArgs) {
  try {
    const data = await updateDeviceService(args.id, args.input)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  } 
}

export async function deleteDeviceController (_: any, args: DeleteDeviceArgs) {
  try {
    const data = await deleteDeviceService(args.id)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  } 
}

