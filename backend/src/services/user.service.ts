import bcrypt from "bcrypt"
import { Permission, User, UserInput } from "../interfaces/user.interface"
import { createUserRepository, deleteUserRepository, getPermissionsByUserIdRepository, getUserByEmailRepository, getUserByIdRepository, getUsersRepository, updateUserRepository } from "../repositories/user.repository"

const SALT_ROUNDS = 10

export async function getUsersService(): Promise<User[]> {
  return await getUsersRepository()
}

export async function getUserByIdService(id: number): Promise<User> {
  return await getUserByIdRepository(id)
}

export async function createUserService(input: UserInput): Promise<User> {
  input.password_hash = await bcrypt.hash(input.password_hash, SALT_ROUNDS)
  const user = await createUserRepository(input)
  return user
}

export async function updateUserService(id: number, input: UserInput): Promise<User> {
  const user = await getUserByIdRepository(id)
  input.password_hash = input.password_hash 
    ? await bcrypt.hash(input.password_hash, SALT_ROUNDS)
    : input.password_hash = user.password_hash
  return await updateUserRepository(id, input)
}
export async function deleteUserService(id: number): Promise<boolean> {
  return await deleteUserRepository(id)
}

export async function getUserByEmailService(email: string): Promise<User> {
  return await getUserByEmailRepository(email)
}

export async function getPermissionByUserIdService(id: number): Promise<Permission[]> {
  return await getPermissionsByUserIdRepository(id)
}