import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

const IMAGES_PER_PAGE = 5

export const imagePage = ({ page = 1 }) => {
  const offset = (page - 1) * IMAGES_PER_PAGE

  return {
    images: db.image.findMany({
      take: IMAGES_PER_PAGE,
      skip: offset,
    }),
    count: db.image.count(),
  }
}

export const images: QueryResolvers['images'] = () => {
  return db.image.findMany()
}

export const image: QueryResolvers['image'] = ({ id }) => {
  return db.image.findUnique({
    where: { id },
  })
}

export const createImage: MutationResolvers['createImage'] = ({ input }) => {
  return db.image.create({
    data: input,
  })
}

export const updateImage: MutationResolvers['updateImage'] = ({
  id,
  input,
}) => {
  return db.image.update({
    data: input,
    where: { id },
  })
}

export const deleteImage: MutationResolvers['deleteImage'] = ({ id }) => {
  return db.image.delete({
    where: { id },
  })
}
