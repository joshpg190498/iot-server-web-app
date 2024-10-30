import { getHourlyParametersService, getParametersService } from "../services/parameter.service"

export async function getHourlyParametersController (_: any, __: any, context: any) {
  try {
    const data = await getHourlyParametersService()
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getParametersController (_: any, __: any, context: any) {
  try {
    const data = await getParametersService()
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}
