import config from "../config"
import { Kafka, logLevel } from "kafkajs"
import { pubsub } from "../pubsub"

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: [config.kafka.broker],
  logLevel: logLevel.INFO, 
})

const consumer = kafka.consumer({ groupId: config.kafka.groupId })

export async function runConsumer(topic: string, handleMessage: (message: any) => void) {
  try {
    await consumer.connect()
    console.log(`Connected to Kafka broker at ${config.kafka.broker}`)

    await consumer.subscribe({ topic })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        handleMessage({
          topic,
          partition,
          key: message?.key?.toString(),
          value: message?.value?.toString(),
        })
      },
    })
  } catch (err) {
    console.error('Error consuming messages with Kafka', err)
  }
}

const handleMessage = (message: any) => {
  try {
    const parsedValue = JSON.parse(message.value)

    const { IDDevice, Parameter, Data, CollectedAtUtc } = parsedValue
    pubsub.publish(`NEW_${IDDevice}_DATA`, {
      newDeviceData: {
        id_device: IDDevice,
        parameter: Parameter,
        data: Data,
        collected_at_utc: CollectedAtUtc
      }
    })
  } catch (err) {
    console.error(err)
  }
  console.log(message)
  console.log(`Received message: ${JSON.stringify(message)}`)
}

runConsumer(config.kafka.topics.newDeviceData, handleMessage).catch(console.error)
