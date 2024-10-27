import * as dotenv from 'dotenv'
import * as path from 'path'

const envPath = path.join(process.cwd(), '.env')
dotenv.config({ path: envPath })

const config = {
  api: {
    port: Number(process.env.BACKEND_APP_PORT) || 3000
  },
  postgres: {
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres'
  },
  kafka: {
    broker: process.env.KAFKA_BROKER || '127.0.0.1:9092',
    topics: {
      deviceUpdateEvents: 'device-update-events',
      deviceDataEvents: 'device-data-events'
    },
    clientId: 'web-app-backend-kafka-client',
    groupId: 'device-data-events-websocket-group'
  },
  jwt: {
    secretKey: process.env.JWT_SECURITY || 'secret_key'
  }
}

export default config