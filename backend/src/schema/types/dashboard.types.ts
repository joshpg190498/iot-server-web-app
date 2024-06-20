const typeDefs = `#graphql
  type DashboardDevice {
    id: Int!
    id_device: String!
    creation_datetime_utc: String!
    update_datetime_utc: String
    hostname: String
    processor: String
    ram: String
    hostid: String
    os: String
    kernel: String
    collected_at_utc: String
    inserted_at_utc: String
  }

  type RamUsage {
    id: Int!
    id_device: String!
    total_ram: Float
    free_ram: Float
    used_ram: Float
    used_percent_ram: Float
    collected_at_utc: String
    inserted_at_utc: String
  }

  type CpuTemperature {
    id: Int!
    id_device: String!
    sensor_key: String
    temperature: Float
    collected_at_utc: String
    inserted_at_utc: String
  }

  type Query {
    dashboardDevices: [DashboardDevice]
    ramUsage(id_device: String!): [RamUsage]
    cpuTemperature(id_device: String!): [CpuTemperature]
  }
`

export default typeDefs