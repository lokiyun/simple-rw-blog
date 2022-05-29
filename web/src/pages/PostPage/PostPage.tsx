import { MetaTags } from '@redwoodjs/web'
import { useLazyQuery } from '@apollo/client'
import styled from 'styled-components'
import Table from 'antd/lib/table'
import { pageTransition, pageVariants } from 'src/Routes'
import { motion } from 'framer-motion'
import { Link, routes } from '@redwoodjs/router'
import Pagination from 'antd/lib/pagination'
import { useEffect, useState } from 'react'

const postsQuery = gql`
  query postsQuery($page: Int) {
    postPage(page: $page) {
      posts {
        id
        title
        desc
        category {
          name
        }
        author {
          username
        }
        createdAt
        updatedAt
        deletedAt
        PostTag {
          tag {
            id
            name
          }
        }
      }
      count
    }
  }
`

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Header = styled.header`
  display: flex;
  height: 3rem;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.body};
`

const HeaderActions = styled.div`
  display: flex;
`

const HeaderActionItem = styled(Link)`
  background-color: ${(props) => props.theme.primary};
  color: #ffffff;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 0.2rem;

  &:hover {
    opacity: 0.8;
    color: #ffffff;
  }
`

const MainContainer = styled.div`
  padding: 1rem 2rem;
`

const TagItem = styled.span`
  margin: 0 0.4rem;
`

const columns: any[] = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
    width: 200,
  },
  {
    title: 'desc',
    dataIndex: 'desc',
    key: 'desc',
    width: 200,
  },
  {
    title: 'category',
    dataIndex: 'category',
    key: 'category',
    width: 100,
    render: (_, { category }) => <span>{category.name}</span>,
  },
  {
    title: 'tags',
    dataIndex: 'tags',
    key: 'tags',
    width: 200,
    render: (_, { PostTag }) => (
      <div>
        {PostTag?.map((item) => (
          <TagItem key={item.tag.id}>{item.tag.name}</TagItem>
        ))}
      </div>
    ),
  },
  {
    title: 'userId',
    dataIndex: 'userId',
    key: 'userId',
    width: 100,
    render: (_, { author }) => <span>{author.username}</span>,
  },
  {
    title: 'createdAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
  },
  {
    title: 'updatedAt',
    dataIndex: 'updatedAt',
    key: 'updateAt',
    width: 200,
  },
]

const PostPage = () => {
  const [current, setCurrent] = useState(1)
  const [getPosts, { data, loading }] = useLazyQuery(postsQuery, {
    variables: {
      page: 1,
    },
  })

  useEffect(() => {
    getPosts({
      variables: {
        page: 1,
      },
    })
  }, [])

  const handleChangePagination = async (cur) => {
    getPosts({
      variables: {
        page: cur,
      },
    })
    setCurrent(cur)
  }

  return (
    <>
      <MetaTags title="Post" description="Post page" />

      <Container
        style={{
          position: 'absolute',
        }}
        transition={pageTransition}
        variants={pageVariants}
        initial="pageInit"
        exit="pageOut"
        animate="pageIn"
      >
        <Header>
          <HeaderActions>
            <HeaderActionItem to={routes.articleWrite()}>
              添加文章
            </HeaderActionItem>
          </HeaderActions>
        </Header>
        <MainContainer>
          {loading ? (
            '加载中...'
          ) : (
            <Table
              rowKey={'id'}
              columns={columns}
              dataSource={data?.postPage.posts}
              pagination={false}
            />
          )}
          {loading ? (
            '加载中'
          ) : (
            <Pagination
              style={{ marginTop: '1rem', textAlign: 'right' }}
              total={data?.postPage.count}
              pageSize={5}
              current={current}
              onChange={handleChangePagination}
            />
          )}
        </MainContainer>
      </Container>
    </>
  )
}

export default PostPage
