import { render } from '@redwoodjs/testing/web'

import BlogHeader from './BlogHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BlogHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BlogHeader />)
    }).not.toThrow()
  })
})
