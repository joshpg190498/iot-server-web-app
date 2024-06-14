export interface User {
  id: number
  username: string
  email: string
  password_hash: string
  first_name?: string
  last_name?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface UserInput {
  username: string
  email: string
  password_hash: string
  id_role: number
  first_name?: string
  last_name?: string
  active?: boolean
  created_at?: string
  updated_at?: string
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