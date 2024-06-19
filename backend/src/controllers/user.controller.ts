import { CreateUserArgs, DeleteUserArgs, UserByIdArgs, UpdateUserArgs, PermissionsByUserIdArgs } from "../interfaces/user.interface"
import { createUserService, deleteUserService, getPermissionByUserIdServiceService, getUserByIdService, getUsersService, updateUserService } from "../services/user.service"

export async function getUsersController (_: any, __: any, context: any) {
  try {
    const data = await getUsersService()
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getUserByIdController (_: any, args: UserByIdArgs) {
  try {
    const data = await getUserByIdService(args.id)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function createUserController (_: any, args: CreateUserArgs) {
  try {
    const data = await createUserService(args.input)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function updateUserController (_: any, args: UpdateUserArgs) {
  try {
    const data = await updateUserService(args.id, args.input)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  } 
}

export async function deleteUserController (_: any, args: DeleteUserArgs) {
  try {
    const data = await deleteUserService(args.id)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  } 
}

export async function getPermissionByUserIdController (_: any, args: PermissionsByUserIdArgs) {
  try {
    const data = await getPermissionByUserIdServiceService(args.id)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  } 
}

