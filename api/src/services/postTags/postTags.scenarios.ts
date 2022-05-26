import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostTagCreateArgs>({
  postTag: {
    one: {
      data: {
        post: {
          create: {
            updatedAt: '2022-05-26T05:55:48Z',
            category: {
              create: {
                name: 'String2331479',
                updatedAt: '2022-05-26T05:55:48Z',
              },
            },
            author: {
              create: {
                username: 'String1893961',
                updatedAt: '2022-05-26T05:55:48Z',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        tag: {
          create: { name: 'String8834254', updatedAt: '2022-05-26T05:55:48Z' },
        },
      },
    },
    two: {
      data: {
        post: {
          create: {
            updatedAt: '2022-05-26T05:55:48Z',
            category: {
              create: {
                name: 'String7412705',
                updatedAt: '2022-05-26T05:55:48Z',
              },
            },
            author: {
              create: {
                username: 'String7389205',
                updatedAt: '2022-05-26T05:55:48Z',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        tag: {
          create: { name: 'String7502884', updatedAt: '2022-05-26T05:55:48Z' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
