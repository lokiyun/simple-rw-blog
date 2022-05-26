export const schema = gql`
  type PostTag {
    id: String!
    postId: String!
    post: Post!
    tagId: String!
    tag: Tag!
  }

  type Query {
    postTags: [PostTag!]! @requireAuth
    postTag(id: String!): PostTag @requireAuth
    tagsByPostId(postId: String!): [PostTag!]! @skipAuth
  }

  input CreatePostTagInput {
    postId: String!
    tagId: String!
  }

  input UpdatePostTagInput {
    postId: String
    tagId: String
  }

  type Mutation {
    createPostTag(input: CreatePostTagInput!): PostTag! @requireAuth
    updatePostTag(id: String!, input: UpdatePostTagInput!): PostTag!
      @requireAuth
    deletePostTag(id: String!): PostTag! @requireAuth
  }
`
