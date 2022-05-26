import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        updatedAt: '2022-05-26T05:55:56Z',
        category: {
          create: { name: 'String8085430', updatedAt: '2022-05-26T05:55:56Z' },
        },
        author: {
          create: {
            username: 'String3909105',
            updatedAt: '2022-05-26T05:55:56Z',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-05-26T05:55:56Z',
        category: {
          create: { name: 'String5391416', updatedAt: '2022-05-26T05:55:56Z' },
        },
        author: {
          create: {
            username: 'String7936561',
            updatedAt: '2022-05-26T05:55:56Z',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
