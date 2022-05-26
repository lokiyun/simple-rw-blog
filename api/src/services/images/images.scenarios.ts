import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ImageCreateArgs>({
  image: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = typeof standard
