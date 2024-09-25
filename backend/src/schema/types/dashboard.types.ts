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
    cpu_count: Int
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

  type CpuUsage {
    id: Int!
    id_device: String!
    cpu_usage: Float
    collected_at_utc: String
    inserted_at_utc: String
  }

  type DiskUsage {
    id: Int!,
    id_device: String!,
    disk_name: String,
    total_disk: Float,
    free_disk: Float,
    used_disk: Float,
    used_percent_disk: Float,
    collected_at_utc: String,
    inserted_at_utc: String
  }

  type LoadAverage {
    id: Int!,
    id_device: String!,
    load_average_1m: Float,
    load_average_5m: Float,
    load_average_15m: Float,
    collected_at_utc: String,
    inserted_at_utc: String
  }

  type NetworkStats {
    id: Int!,
    id_device: String!,
    interface_name: String,
    bytes_sent: Float,
    bytes_recv: Float,
    packets_sent: Float,
    packets_recv: Float,
    errout: Float,
    errin: Float,
    dropin: Float,
    dropout: Float,
    collected_at_utc: String,
    inserted_at_utc: String
  }

  type DashboardDeviceData {
    ramUsage: [RamUsage]
    cpuTemperature: [CpuTemperature]
    cpuUsage: [CpuUsage]
    diskUsage: [DiskUsage]
    loadAverage: [LoadAverage]
    networkStats: [NetworkStats]
  }

  type Query {
    dashboardDevices: [DashboardDevice]
    ramUsage(id_device: String!): [RamUsage]
    cpuTemperature(id_device: String!): [CpuTemperature]
    cpuUsage(id_device: String!): [CpuUsage]
    diskUsage(id_device: String!): [DiskUsage]
    loadAverage(id_device: String!): [LoadAverage]
    networkStats(id_device: String!): [NetworkStats]
    dashboardDeviceData(id_device: String!): DashboardDeviceData
  }
`

export default typeDefs