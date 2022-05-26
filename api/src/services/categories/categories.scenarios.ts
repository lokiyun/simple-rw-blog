import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CategoryCreateArgs>({
  category: {
    one: { data: { name: 'String4483676', updatedAt: '2022-05-26T05:56:19Z' } },
    two: { data: { name: 'String3378495', updatedAt: '2022-05-26T05:56:19Z' } },
  },
})

export type StandardScenario = typeof standard
