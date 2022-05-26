import { posts, post, createPost, updatePost, deletePost } from './posts'
import type { StandardScenario } from './posts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('posts', () => {
  scenario('returns all posts', async (scenario: StandardScenario) => {
    const result = await posts()

    expect(result.length).toEqual(Object.keys(scenario.post).length)
  })

  scenario('returns a single post', async (scenario: StandardScenario) => {
    const result = await post({ id: scenario.post.one.id })

    expect(result).toEqual(scenario.post.one)
  })

  scenario('creates a post', async (scenario: StandardScenario) => {
    const result = await createPost({
      input: {
        categoryId: scenario.post.two.categoryId,
        userId: scenario.post.two.userId,
        updatedAt: '2022-05-26T05:55:56Z',
      },
    })

    expect(result.categoryId).toEqual(scenario.post.two.categoryId)
    expect(result.userId).toEqual(scenario.post.two.userId)
    expect(result.updatedAt).toEqual('2022-05-26T05:55:56Z')
  })

  scenario('updates a post', async (scenario: StandardScenario) => {
    const original = await post({ id: scenario.post.one.id })
    const result = await updatePost({
      id: original.id,
      input: { updatedAt: '2022-05-27T05:55:56Z' },
    })

    expect(result.updatedAt).toEqual('2022-05-27T05:55:56Z')
  })

  scenario('deletes a post', async (scenario: StandardScenario) => {
    const original = await deletePost({ id: scenario.post.one.id })
    const result = await post({ id: original.id })

    expect(result).toEqual(null)
  })
})
