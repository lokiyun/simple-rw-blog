import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  PostResolvers,
} from 'types/graphql'

const PER_PAGE = +process.env.DEFAULT_PAGINATION_SIZE

export const postPage = ({ page = 1 }) => {
  const offset = (page - 1) * PER_PAGE

  return {
    posts: db.post.findMany({
      take: PER_PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.post.count(),
  }
}

export const postPageByCategory = ({ page = 1, category }) => {
  const offset = (page - 1) * PER_PAGE

  return {
    posts: db.post.findMany({
      where: { categoryId: category },
      take: PER_PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.post.count({
      where: { categoryId: category },
    }),
  }
}

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  return db.post.create({
    data: input,
  })
}

export const updatePost: MutationResolvers['updatePost'] = ({ id, input }) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost: MutationResolvers['deletePost'] = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}

export const Post: PostResolvers = {
  category: (_obj, { root }) =>
    db.post.findUnique({ where: { id: root.id } }).category(),
  author: (_obj, { root }) =>
    db.post.findUnique({ where: { id: root.id } }).author(),
  PostTag: (_obj, { root }) =>
    db.post.findUnique({ where: { id: root.id } }).PostTag(),
}
