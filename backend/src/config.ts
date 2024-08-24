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
      deviceUpdate: process.env.KAFKA_TOPIC_DEVICE_UPDATE || 'kafka-topic',
      newDeviceData: process.env.KAFKA_TOPIC_NEW_DEVICE_DATA || 'kafka-topic2'
    },
    clientId: process.env.KAFKA_CLIENT_ID || 'client-id',
    groupId: process.env.KAFKA_GROUP_ID || '3'
  },
  jwt: {
    secretKey: process.env.JWT_SECURITY || 'secret_key'
  }
}

export default config