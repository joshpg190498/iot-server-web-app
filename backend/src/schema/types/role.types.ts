const typeDefs = `#graphql
  type Role {
    id: Int
    role_name: String
    description: String
  }

  type Query {
    roles: [Role]
  }
`

export default typeDefs