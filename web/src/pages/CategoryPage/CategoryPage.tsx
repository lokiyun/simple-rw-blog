import { MetaTags, useMutation } from '@redwoodjs/web'
import styled from 'styled-components'
import Table from 'antd/lib/table'
import { motion } from 'framer-motion'
import { pageTransition, pageVariants } from 'src/Routes'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import { useEffect, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import Pagination from 'antd/lib/pagination'
import { useLazyQuery } from '@apollo/client'

const createCategoryMutation = gql`
  mutation createCategoryMutation($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      desc
      createdAt
      updatedAt
    }
  }
`

export const categoryQuery = gql`
  query Categories {
    categories {
      id
      name
      desc
      createdAt
      updatedAt
    }
  }
`

export const categoriesQuery = gql`
  query categoriesQuery($page: Int) {
    categoryPage(page: $page) {
      count
      categories {
        id
        name
        desc
        createdAt
        updatedAt
      }
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
    width: 200,
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: 'desc',
    dataIndex: 'desc',
    key: 'desc',
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

const CategoryPage = () => {
  // const { data, loading } = useQuery(categoryQuery)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [createCategory] = useMutation(createCategoryMutation, {
    refetchQueries: [{ query: categoriesQuery }],
  })
  const [getCategories, { data, loading }] = useLazyQuery(categoriesQuery)
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    getCategories()
  }, [])

  const handleChangePagination = (cur) => {
    getCategories({
      variables: {
        page: cur,
      },
    })
    setCurrent(cur)
  }

  const handleCancel = () => {
    setOpen(false)
    unstable_batchedUpdates(() => {
      setName('')
      setDesc('')
    })
  }

  const handleSubmit = () => {
    createCategory({
      variables: {
        input: {
          name,
          desc,
        },
      },
    })
      .then((res) => {
        console.log(res)
      })
      .finally(() => {
        setOpen(false)
        unstable_batchedUpdates(() => {
          setName('')
          setDesc('')
        })
      })
  }

  return (
    <>
      <MetaTags title="Category" description="Category page" />

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
              添加分类
            </HeaderActionItem>
          </HeaderActions>
        </Header>
        <MainContainer>
          {loading ? (
            '加载中...'
          ) : (
            <Table
              pagination={false}
              rowKey={'id'}
              columns={columns}
              dataSource={data?.categoryPage.categories}
            />
          )}
          {loading ? (
            '加载中'
          ) : (
            <Pagination
              style={{ marginTop: '1rem', textAlign: 'right' }}
              total={data?.categoryPage.count}
              pageSize={5}
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
            placeholder="请输入分类名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="请输入描述"
            value={desc}
            style={{ marginTop: '1rem' }}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Modal>
      </Container>
    </>
  )
}

export default CategoryPage
