export const schema = gql`
  type User {
    id: String!
    username: String!
    password: String!
    nickName: String
    createdAt: DateTime!
    updatedAt: DateTime!
    avatar: String
    roles: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    post: [Post]!
  }

  type UserPage {
    users: [User!]!
    count: Int!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
    userPage(page: Int): UserPage @skipAuth
  }

  input CreateUserInput {
    username: String!
    password: String!
    nickName: String
    avatar: String
    roles: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    username: String
    password: String
    nickName: String
    avatar: String
    roles: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
