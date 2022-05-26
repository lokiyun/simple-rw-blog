import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  TagResolvers,
} from 'types/graphql'

const TAGS_PER_PAGE = 5

export const tagPage = ({ page = 1 }) => {
  const offset = (page - 1) * TAGS_PER_PAGE

  return {
    tags: db.tag.findMany({
      take: TAGS_PER_PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.tag.count(),
  }
}

export const tags: QueryResolvers['tags'] = () => {
  return db.tag.findMany()
}

export const tag: QueryResolvers['tag'] = ({ id }) => {
  return db.tag.findUnique({
    where: { id },
  })
}

export const createTag: MutationResolvers['createTag'] = ({ input }) => {
  return db.tag.create({
    data: input,
  })
}

export const updateTag: MutationResolvers['updateTag'] = ({ id, input }) => {
  return db.tag.update({
    data: input,
    where: { id },
  })
}

export const deleteTag: MutationResolvers['deleteTag'] = ({ id }) => {
  return db.tag.delete({
    where: { id },
  })
}

export const Tag: TagResolvers = {
  PostTag: (_obj, { root }) =>
    db.tag.findUnique({ where: { id: root.id } }).PostTag(),
}
