import { getThresholdAlertDataService } from "../services/threshold-alert.service"

export async function getThresholdAlertDataController (_: any, args: any) {
  try {
    const data = await getThresholdAlertDataService(args.id_device, args.id_parameter)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}