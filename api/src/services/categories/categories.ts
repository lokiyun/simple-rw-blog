import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  CategoryResolvers,
} from 'types/graphql'

const PER_PAGE = +process.env.DEFAULT_PAGINATION_SIZE

export const categoryPage = ({ page = 1 }) => {
  const offset = (page - 1) * PER_PAGE

  return {
    categories: db.category.findMany({
      take: PER_PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.category.count(),
  }
}

export const categories: QueryResolvers['categories'] = () => {
  return db.category.findMany()
}

export const category: QueryResolvers['category'] = ({ id }) => {
  return db.category.findUnique({
    where: { id },
  })
}

export const createCategory: MutationResolvers['createCategory'] = ({
  input,
}) => {
  return db.category.create({
    data: input,
  })
}

export const updateCategory: MutationResolvers['updateCategory'] = ({
  id,
  input,
}) => {
  return db.category.update({
    data: input,
    where: { id },
  })
}

export const deleteCategory: MutationResolvers['deleteCategory'] = ({ id }) => {
  return db.category.delete({
    where: { id },
  })
}

export const Category: CategoryResolvers = {
  post: (_obj, { root }) =>
    db.category.findUnique({ where: { id: root.id } }).post(),
}
