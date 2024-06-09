import config from "../config"
import { Pool } from "pg"

const pool = new Pool({
    user: config.postgres.user,
    host: config.postgres.host,
    database: config.postgres.database,
    password: config.postgres.password,
    port: config.postgres.port,
})

export default pool