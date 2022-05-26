export const schema = gql`
  type Category {
    id: String!
    name: String!
    desc: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    post: [Post]!
  }

  type CategoryPage {
    categories: [Category!]!
    count: Int!
  }

  type Query {
    categories: [Category!]! @requireAuth
    category(id: String!): Category @requireAuth
    categoryPage(page: Int): CategoryPage @skipAuth
  }

  input CreateCategoryInput {
    name: String!
    desc: String!
  }

  input UpdateCategoryInput {
    name: String
    desc: String
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category! @requireAuth
    updateCategory(id: String!, input: UpdateCategoryInput!): Category!
      @requireAuth
    deleteCategory(id: String!): Category! @requireAuth
  }
`
