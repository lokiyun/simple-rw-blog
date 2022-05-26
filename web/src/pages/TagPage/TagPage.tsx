import { MetaTags, useMutation } from '@redwoodjs/web'
import styled from 'styled-components'
import Table from 'antd/lib/table'
import { motion } from 'framer-motion'
import { pageTransition, pageVariants } from 'src/Routes'
import { useEffect, useState } from 'react'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Pagination from 'antd/lib/pagination'
import { useLazyQuery } from '@apollo/client'

export const tagQuery = gql`
  query Tags {
    tags {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const tagsQuery = gql`
  query tagsQuery($page: Int) {
    tagPage(page: $page) {
      count
      tags {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`

export const createTagMutation = gql`
  mutation createTagMutation($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      name
      createdAt
      updatedAt
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

const HeaderActionItem = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: #ffffff;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 0.2rem;

  &:hover {
    opacity: 0.8;
  }
`

const MainContainer = styled.div`
  padding: 1rem 2rem;
`

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
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
    key: 'updatedAt',
    width: 200,
  },
]

const TagPage = () => {
  const [createTag] = useMutation(createTagMutation, {
    refetchQueries: [{ query: tagsQuery }],
  })
  const [open, setOpen] = useState(false)
  const [getTags, { data, loading }] = useLazyQuery(tagsQuery)
  const [current, setCurrent] = useState(1)

  const [tag, setTag] = useState('')

  useEffect(() => {
    getTags()
  }, [])

  const handleChangePagination = (cur) => {
    getTags({
      variables: {
        page: cur,
      },
    })
    setCurrent(cur)
  }

  const handleCancel = () => {
    setOpen(false)
    setTag('')
  }

  const handleSubmit = () => {
    createTag({
      variables: {
        input: {
          name: tag,
        },
      },
    })
      .then((res) => {
        console.log(res)
      })
      .finally(() => {
        setOpen(false)
      })
  }
  return (
    <>
      <MetaTags title="Tag" description="Tag page" />

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
            <HeaderActionItem onClick={() => setOpen(true)}>
              添加标签
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
              dataSource={data?.tagPage.tags}
              pagination={false}
            />
          )}
          {loading ? (
            '加载中'
          ) : (
            <Pagination
              style={{ marginTop: '1rem', textAlign: 'right' }}
              total={data?.tagPage.count}
              current={current}
              onChange={handleChangePagination}
            />
          )}
        </MainContainer>

        <Modal
          title="添加标签"
          visible={open}
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
          <Input
            placeholder="请输入标签"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </Modal>
      </Container>
    </>
  )
}

export default TagPage
