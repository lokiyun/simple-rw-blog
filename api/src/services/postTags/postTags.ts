import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  PostTagResolvers,
} from 'types/graphql'

export const tagsByPostId: QueryResolvers['postTags'] = async ({
  postId,
}: {
  postId: string
}) => {
  console.log(postId)
  const result = await db.postTag.findMany({
    where: { postId },
  })
  console.log(result)
  return result
}

export const postTags: QueryResolvers['postTags'] = () => {
  return db.postTag.findMany()
}

export const postTag: QueryResolvers['postTag'] = ({ id }) => {
  return db.postTag.findUnique({
    where: { id },
  })
}

export const createPostTag: MutationResolvers['createPostTag'] = ({
  input,
}) => {
  return db.postTag.create({
    data: input,
  })
}

export const updatePostTag: MutationResolvers['updatePostTag'] = ({
  id,
  input,
}) => {
  return db.postTag.update({
    data: input,
    where: { id },
  })
}

export const deletePostTag: MutationResolvers['deletePostTag'] = ({ id }) => {
  return db.postTag.delete({
    where: { id },
  })
}

export const PostTag: PostTagResolvers = {
  post: (_obj, { root }) =>
    db.postTag.findUnique({ where: { id: root.id } }).post(),
  tag: (_obj, { root }) =>
    db.postTag.findUnique({ where: { id: root.id } }).tag(),
}
