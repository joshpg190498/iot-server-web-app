const typeDefs = `#graphql
  type User {
    id: Int
    username: String
    email: String
    first_name: String
    last_name: String
    active: Boolean
  }

  input UserInput {
    username: String!
    email: String!
    password_hash: String!
    first_name: String!
    last_name: String!,
    id_role: Int!
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: Int!, input: UserInput!): User
    updateStateUser(id: Int!, active: Boolean!): User
    deleteUser(id: Int!): Boolean
  }
`

export default typeDefs