const typeDefs = `#graphql

  type Parameter {
    id_parameter: String
    default_period: Int
    table_pointer: String
    description: String
    has_threshold: Boolean
    default_threshold_value: Float
  }

  type Query {
    parameters: [Parameter]
    hourlyParameters: [Parameter]
  }
`

export default typeDefs