import config from "../config"
import { Kafka, logLevel } from "kafkajs"

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: [config.kafka.broker]
})

const producer = kafka.producer()

export async function runProducer (topic: string, key: string, value: any) {
  try {
    await producer.connect()
    const message = {
      key: key,
      value: JSON.stringify(value)
    }
    await producer.send({
      topic,
      messages: [message]
    })
  } catch (err) {
    console.error('error sending message with kafka', err)
  } finally {
    await producer.disconnect()
  }
}