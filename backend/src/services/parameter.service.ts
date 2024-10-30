import { Parameter } from "../interfaces/parameter.interface"
import { getHourlyParametersRepository, getParametersRepository } from "../repositories/parameter.repository"

export async function getHourlyParametersService(): Promise<Parameter[]> {
  return await getHourlyParametersRepository()
}

export async function getParametersService(): Promise<Parameter[]> {
  return await getParametersRepository()
}