export const schema = gql`
  type Image {
    id: String!
    url: String!
  }

  type ImagePage {
    images: [Image!]!
    count: Int!
  }

  type Query {
    images: [Image!]! @requireAuth
    image(id: String!): Image @requireAuth
    imagePage(page: Int): ImagePage @skipAuth
  }

  input CreateImageInput {
    url: String!
  }

  input UpdateImageInput {
    url: String
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @requireAuth
    updateImage(id: String!, input: UpdateImageInput!): Image! @requireAuth
    deleteImage(id: String!): Image! @requireAuth
  }
`
