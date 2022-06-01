import { MetaTags } from '@redwoodjs/web'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Pagination from 'src/components/Pagination/Pagination'
import PostList from 'src/components/PostList/PostList'
import useLoading from 'src/hooks/useLoading'

const Container = styled.div`
  display: flex;
`

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
`

const homePostsByCategoryQuery = gql`
  query homePostsByCategoryQuery($page: Int, $category: String) {
    postPageByCategory(page: $page, category: $category) {
      posts {
        id
        title
        author {
          username
        }
        category {
          id
          name
        }
        PostTag {
          tag {
            id
            name
          }
        }
        createdAt
      }
      count
    }
  }
`

type ArticlesByCategoryProps = {
  id: string
}

const ArticlesByCategoryPage = (props: ArticlesByCategoryProps) => {
  const { id } = props
  const [getPosts, { data, loading }] = useLazyQuery(homePostsByCategoryQuery)
  const [current, setCurrent] = useState(1)

  const loadingState = useLoading(loading)

  useEffect(() => {
    getPosts({
      variables: {
        page: 1,
        category: id,
      },
    })
  }, [])

  const handleChangeCurrent = (index: number) => {
    setCurrent(index)
    getPosts({
      variables: {
        page: index,
        category: id,
      },
    })
  }

  return (
    <>
      <MetaTags
        title="ArticlesByCategory"
        description="ArticlesByCategory page"
      />

      <Container>
        <Main>
          {!loadingState && (
            <>
              <PostList data={data?.postPageByCategory?.posts} />
              <Pagination
                current={current}
                count={data?.postPageByCategory?.count}
                pageSize={5}
                onSelect={handleChangeCurrent}
              />
            </>
          )}
        </Main>
        {/* <Aside /> */}
      </Container>
    </>
  )
}

export default ArticlesByCategoryPage
