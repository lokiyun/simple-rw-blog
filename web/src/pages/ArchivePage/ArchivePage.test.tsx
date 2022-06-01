import { render } from '@redwoodjs/testing/web'

import ArchivePage from './ArchivePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ArchivePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ArchivePage />)
    }).not.toThrow()
  })
})
