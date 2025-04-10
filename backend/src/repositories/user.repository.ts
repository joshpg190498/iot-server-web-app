import pool from "../database"
import { Permission, User, UserInput } from "../interfaces/user.interface"

export async function getUsersRepository(): Promise<User[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      `SELECT 
        u.id, u.username, u.email, u.first_name, u.last_name, u.active, u.id_role, r.role_name as role
      FROM USERS u 
      INNER JOIN ROLES r
      ON u.id_role = r.id 
      ORDER BY u.id`)
    return result.rows
  } finally {
    client.release()
  }
}

export async function getUserByIdRepository(id: number): Promise<User> {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT id, username, email, password_hash, first_name, last_name, active, created_at_utc, updated_at_utc FROM USERS WHERE id = $1', [id])
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function createUserRepository(input: UserInput): Promise<User> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      `INSERT INTO USERS (username, email, password_hash, first_name, last_name, id_role)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [input.username, input.email, input.password_hash, input.first_name, input.last_name, input.id_role]
    )
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function updateUserRepository(id: number, input: Partial<UserInput>): Promise<User> {
  const client = await pool.connect()
  try {
    const updatedAtUtc = new Date()
    const result = await client.query(
      `UPDATE USERS 
       SET first_name = $1, 
           last_name = $2, 
           id_role = $3,
           password_hash = $4, 
           updated_at_utc = $5 
       WHERE id = $6
       RETURNING *`,
      [input.first_name, input.last_name, input.id_role, input.password_hash, updatedAtUtc, id]
    )
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function deleteUserRepository(id: number): Promise<boolean> {
  const client = await pool.connect()
  try {
    await client.query('DELETE FROM USERS WHERE id = $1', [id])
    return true
  } finally {
    client.release()
  }
}

export async function getUserByEmailRepository(email: string): Promise<User> {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT id, username, email, password_hash, first_name, last_name, active, id_role, created_at_utc, updated_at_utc FROM USERS WHERE email = $1', [email])
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function getPermissionsByUserIdRepository(id: number): Promise<Permission[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`
        SELECT p.id, p.permission_name, p.icon, p.path, p.description
          FROM PERMISSIONS p
          INNER JOIN ROLE_PERMISSIONS rp
          ON p.id = rp.id_permission 
          INNER JOIN USERS U
          ON u.id_role = rp.id_role
        WHERE u.id = $1
      `, [id])
    return result.rows
  } finally {
    client.release()
  }
}