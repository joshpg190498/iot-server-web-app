import { ThresholdAlert } from "../interfaces/threshold-alert.interface"
import { getThresholdAlertDataByIdDeviceRepository } from "../repositories/threshold-alert.repository"

export async function getThresholdAlertDataService(
  id_device: string,
  id_parameter: string
): Promise<ThresholdAlert[]> {
  const data = await getThresholdAlertDataByIdDeviceRepository(id_device, id_parameter)
  return data
}