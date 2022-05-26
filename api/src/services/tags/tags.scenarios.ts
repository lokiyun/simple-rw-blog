import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TagCreateArgs>({
  tag: {
    one: { data: { name: 'String2702110', updatedAt: '2022-05-26T05:55:38Z' } },
    two: { data: { name: 'String7613602', updatedAt: '2022-05-26T05:55:38Z' } },
  },
})

export type StandardScenario = typeof standard
