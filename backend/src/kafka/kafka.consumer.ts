import config from "../config"
import { Kafka, logLevel } from "kafkajs"
import { pubsub } from "../pubsub"
import { getDataByTablePointerAndCollectedDate, getParameterById } from "../repositories/pointer.repository"

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

const handleMessage = async (message: any) => {
  try {
    const parsedValue = JSON.parse(message.value)
    const { IDDevice, Parameter, CollectedAtUtc } = parsedValue
    const parameterInfo = await getParameterById(Parameter)
    const data = await getDataByTablePointerAndCollectedDate(parameterInfo.table_pointer, CollectedAtUtc)
    const formattedData = formatData(data)
    if (data.length) {
      pubsub.publish(`NEW_${IDDevice}_DATA`, {
        newDeviceData: {
          id_device: IDDevice,
          parameter: Parameter,
          data: formattedData
        }
      })  
    }
  } catch (err) {
    console.error(err)
  }
  console.log(`Received message: ${JSON.stringify(message)}`)
}

const formatData = (data: any) => {
  return data.map((item: any) => {
    const collectedTimestamp = new Date(item.collected_at_utc).getTime()
    const insertedTimestamp = new Date(item.inserted_at_utc).getTime()
    return {
      ...item,
      collected_at_utc: collectedTimestamp.toString(),
      inserted_at_utc: insertedTimestamp.toString()
    };
  });
}

runConsumer(config.kafka.topics.deviceDataEvents, handleMessage).catch(console.error)
