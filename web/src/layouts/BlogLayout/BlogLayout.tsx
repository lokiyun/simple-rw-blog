import BlogHeader from 'src/components/BlogHeader/BlogHeader'

import styled from 'styled-components'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const Container = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
`

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <Container>
      <BlogHeader />
      {children}
    </Container>
  )
}

export default BlogLayout
