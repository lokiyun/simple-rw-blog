import { render } from '@redwoodjs/testing/web'

import ArticleWritePage from './ArticleWritePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ArticleWritePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ArticleWritePage />)
    }).not.toThrow()
  })
})
