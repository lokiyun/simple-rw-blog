export const schema = gql`
  type Tag {
    id: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    PostTag: [PostTag]!
  }

  type TagPage {
    tags: [Tag!]!
    count: Int!
  }

  type Query {
    tags: [Tag!]! @requireAuth
    tag(id: String!): Tag @requireAuth
    tagPage(page: Int): TagPage @skipAuth
  }

  input CreateTagInput {
    name: String!
  }

  input UpdateTagInput {
    name: String
  }

  type Mutation {
    createTag(input: CreateTagInput!): Tag! @requireAuth
    updateTag(id: String!, input: UpdateTagInput!): Tag! @requireAuth
    deleteTag(id: String!): Tag! @requireAuth
  }
`
