import { MetaTags } from '@redwoodjs/web'
import Banner from 'src/components/Banner/Banner'
import PostList from 'src/components/PostList/PostList'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Pagination from 'src/components/Pagination/Pagination'
import { useRecoilState } from 'recoil'
import LoadingState from 'src/components/Loading/Loading.store'

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

const Aside = styled.aside`
  width: 300px;
`

const HomePage = () => {
  const [getPosts, { data, loading }] = useLazyQuery(homePostsQuery)
  const [current, setCurrent] = useState(1)
  const [loadingState, setLoadingState] = useRecoilState(LoadingState)

  useEffect(() => {
    getPosts()
  }, [])

  const handleChangeCurrent = (index: number) => {
    setCurrent(index)
    getPosts({
      variables: {
        page: index,
      },
    })
  }

  useEffect(() => {
    if (loading) {
      setLoadingState(true)
    } else {
      setTimeout(() => {
        setLoadingState(false)
      }, 1000)
    }
  }, [loading])
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      {current === 1 && <Banner />}

      <Container>
        <Main>
          {!loading && !loadingState && (
            <>
              <PostList data={data?.postPage?.posts} />
              <Pagination
                current={current}
                count={data?.postPage?.count}
                pageSize={5}
                onSelect={handleChangeCurrent}
              />
            </>
          )}
        </Main>
        <Aside />
      </Container>
    </>
  )
}

export default HomePage
