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

  type Query {
    dashboardDevices: [DashboardDevice]
  }
`

export default typeDefs