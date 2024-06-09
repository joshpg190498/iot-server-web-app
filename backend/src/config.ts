const config = {
  api: {
    port: Number(process.env.BACKEND_PORT) || 3000
  },
  postgres: {
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres'
  },
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID || 'client-id',
    broker: process.env.KAFKA_BROKER || 'kafka-broker',
    topic: process.env.KAFKA_TOPIC || 'kafka-topic'
  }
}

export default config