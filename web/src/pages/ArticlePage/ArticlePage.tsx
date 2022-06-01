import { MetaTags, useQuery } from '@redwoodjs/web'
import styled from 'styled-components'
import * as marked from 'marked'
import useLoading from 'src/hooks/useLoading'

type ArticlePageProps = {
  id: string
}

const articleQuery = gql`
  query articleQuery($id: String!) {
    post(id: $id) {
      title
      desc
      content
      author {
        username
      }
      category {
        name
        id
      }
      createdAt
    }
  }
`

const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 1rem auto;
  background-color: #ffffff;
  padding: 1rem 2rem;
`

const Title = styled.h1`
  /* font-size: 2.5rem; */
  word-break: break-all;
  width: 100%;
`

const Desc = styled.div`
  padding: 1rem;
  /* margin-top: 0.5rem; */
  background-color: #ececec;
`

const Content = styled.div`
  margin-top: 2rem;
  padding-bottom: 2rem;
`

const ArticlePage = (props: ArticlePageProps) => {
  const { id } = props
  const { data, loading } = useQuery(articleQuery, {
    variables: {
      id,
    },
  })

  const loadingState = useLoading(loading)

  return (
    <>
      <MetaTags title={data?.post?.title} description={data?.post?.desc} />

      {!loading && !loadingState && (
        <Container>
          <Title>{data?.post?.title}</Title>
          <Desc>{data?.post?.desc}</Desc>
          <Content
            dangerouslySetInnerHTML={{
              __html: marked.parse(data.post.content),
            }}
          ></Content>
        </Container>
      )}
    </>
  )
}

export default ArticlePage
