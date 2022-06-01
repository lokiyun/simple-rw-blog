import { render } from '@redwoodjs/testing/web'

import ArticlesByCategoryPage from './ArticlesByCategoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ArticlesByCategoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ArticlesByCategoryPage />)
    }).not.toThrow()
  })
})
