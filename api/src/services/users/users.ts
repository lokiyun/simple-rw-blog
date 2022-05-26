import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
} from 'types/graphql'

const USERS_PER_PAGE = 5

export const userPage = ({ page = 1 }) => {
  const offset = (page - 1) * USERS_PER_PAGE

  return {
    users: db.user.findMany({
      take: USERS_PER_PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.user.count(),
  }
}

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserResolvers = {
  post: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).post(),
}
