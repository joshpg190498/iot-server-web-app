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
    broker: process.env.KAFKA_BROKER || 'kafka-broker',
    topic: process.env.KAFKA_TOPIC_DEVICE_UPDATE || 'kafka-topic',
    clientId: process.env.BACKEND_APP_KAFKA_CLIENT_ID || 'client-id',
  }
}

export default config