export interface User {
  id: number
  username: string
  email: string
  password_hash: string
  first_name?: string
  last_name?: string
  active: boolean
  id_role: number
  created_at_utc: string
  updated_at_utc: string
}

export interface UserInput {
  username: string
  email: string
  password_hash: string
  first_name?: string
  last_name?: string
  active?: boolean
  id_role: number
  created_at_utc?: string
  updated_at_utc?: string
}

export interface UserByIdArgs {
  id: number
}

export interface CreateUserArgs {
  input: UserInput
}

export interface UpdateUserArgs {
  id: number
  input: UserInput
}

export interface DeleteUserArgs {
  id: number
}

export interface Permission {
  id: number,
  permission_name: string,
  icon: string,
  path: string,
  description: string
}

export interface PermissionsByUserIdArgs {
  id: number
}