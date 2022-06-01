export const schema = gql`
  type Post {
    id: String!
    title: String!
    desc: String!
    content: String!
    category: Category!
    categoryId: String!
    author: User!
    userId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
    PostTag: [PostTag]!
  }

  type PostPage {
    posts: [Post!]!
    count: Int!
  }

  type Query {
    posts: [Post!]! @skipAuth
    post(id: String!): Post @skipAuth
    postPage(page: Int): PostPage @skipAuth
    postPageByCategory(page: Int, category: String): PostPage @skipAuth
  }

  input CreatePostInput {
    title: String!
    desc: String!
    content: String!
    categoryId: String!
    userId: String!
    deletedAt: DateTime
  }

  input UpdatePostInput {
    title: String
    desc: String
    content: String
    categoryId: String
    userId: String
    deletedAt: DateTime
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: String!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: String!): Post! @requireAuth
  }
`
