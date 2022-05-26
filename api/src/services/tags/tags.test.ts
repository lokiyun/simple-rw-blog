import { tags, tag, createTag, updateTag, deleteTag } from './tags'
import type { StandardScenario } from './tags.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tags', () => {
  scenario('returns all tags', async (scenario: StandardScenario) => {
    const result = await tags()

    expect(result.length).toEqual(Object.keys(scenario.tag).length)
  })

  scenario('returns a single tag', async (scenario: StandardScenario) => {
    const result = await tag({ id: scenario.tag.one.id })

    expect(result).toEqual(scenario.tag.one)
  })

  scenario('creates a tag', async () => {
    const result = await createTag({
      input: { name: 'String2512441', updatedAt: '2022-05-26T05:55:37Z' },
    })

    expect(result.name).toEqual('String2512441')
    expect(result.updatedAt).toEqual('2022-05-26T05:55:37Z')
  })

  scenario('updates a tag', async (scenario: StandardScenario) => {
    const original = await tag({ id: scenario.tag.one.id })
    const result = await updateTag({
      id: original.id,
      input: { name: 'String83656392' },
    })

    expect(result.name).toEqual('String83656392')
  })

  scenario('deletes a tag', async (scenario: StandardScenario) => {
    const original = await deleteTag({ id: scenario.tag.one.id })
    const result = await tag({ id: original.id })

    expect(result).toEqual(null)
  })
})
