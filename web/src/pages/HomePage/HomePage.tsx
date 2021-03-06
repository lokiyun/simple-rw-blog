import { MetaTags } from '@redwoodjs/web'
import Banner from 'src/components/Banner/Banner'
import PostList from 'src/components/PostList/PostList'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import { useCallback, useLayoutEffect, useState } from 'react'
import Pagination from 'src/components/Pagination/Pagination'
import useLoading from 'src/hooks/useLoading'

const homePostsQuery = gql`
  query homePostsQuery($page: Int) {
    postPage(page: $page) {
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

const NoArticle = styled.div`
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`

const HomePage = () => {
  const [getPosts, { data, loading }] = useLazyQuery(homePostsQuery)
  const [current, setCurrent] = useState(1)

  const loadingState = useLoading(loading)

  const getPostbyCB = useCallback(() => {
    getPosts({
      variables: {
        page: 1,
      },
    })
  }, [getPosts])

  useLayoutEffect(() => {
    getPostbyCB()
  }, [getPostbyCB])

  const handleChangeCurrent = (index: number) => {
    setCurrent(index)
    getPosts({
      variables: {
        page: index,
      },
    })
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      {current === 1 && <Banner />}

      <Container>
        <Main>
          {!loadingState && data?.postPage.count > 0 ? (
            <>
              <PostList data={data?.postPage?.posts} />
              <Pagination
                current={current}
                count={data?.postPage?.count}
                pageSize={5}
                onSelect={handleChangeCurrent}
              />
            </>
          ) : (
            <NoArticle>????????????</NoArticle>
          )}
        </Main>
        {/* <Aside /> */}
      </Container>
    </>
  )
}

export default HomePage
