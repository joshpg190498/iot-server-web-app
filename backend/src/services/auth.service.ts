import config from "../config"
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import { getUserByEmailRepository } from "../repositories/user.repository";

export async function loginService (email: string, password: string) {
  const user = await getUserByEmailRepository(email)
  const passwordMatch = await bcrypt.compare(password, user.password_hash)
  if(!passwordMatch) throw new Error('Credenciales incorrectas.')
  const token = sign({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    username: user.username,
    active: user.active
  }, config.jwt.secretKey, {
    algorithm: 'HS256',
    expiresIn: '1d'
  })
  return token
}