import { MetaTags, useMutation } from '@redwoodjs/web'
import { useLazyQuery } from '@apollo/client'
import styled from 'styled-components'
import Table from 'antd/lib/table'
import { pageTransition, pageVariants } from 'src/Routes'
import { motion } from 'framer-motion'
import Modal from 'antd/lib/modal'
import { PickerInline } from 'filestack-react'
import Pagination from 'antd/lib/pagination'

import { useEffect, useState } from 'react'

const imagesQuery = gql`
  query imagesQuery($page: Int) {
    imagePage(page: $page) {
      images {
        id
        url
      }
      count
    }
  }
`

const createImageMutation = gql`
  mutation createImageMutation($input: CreateImageInput!) {
    createImage(input: $input) {
      id
      url
    }
  }
`

// 设置图片缩略图
const thumbnail = (url) => {
  const parts = url.split('/')
  parts.splice(3, 0, 'resize=width:50')
  return parts.join('/')
}

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
    width: 300,
  },
  {
    title: 'url',
    dataIndex: 'url',
    key: 'url',
    width: 600,
    render: (_, { url }) => (
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
    ),
  },
  {
    title: '缩略图',
    dataIndex: 'url',
    key: 'small',
    width: 300,
    render: (_, { url }) => <img src={thumbnail(url)} alt={'zz'} />,
  },
]

const CategoryPage = () => {
  const [getImages, { data, loading }] = useLazyQuery(imagesQuery)
  const [createImage] = useMutation(createImageMutation, {
    refetchQueries: [{ query: imagesQuery }],
  })
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    getImages()
  }, [])

  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = () => {}

  const handleChangePagination = (cur) => {
    getImages({
      variables: {
        page: cur,
      },
    })
    setCurrent(cur)
  }

  const onFileUpload = (response) => {
    createImage({
      variables: {
        input: {
          url: response.filesUploaded[0].url,
        },
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setOpen(false)
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
              添加图片
            </HeaderActionItem>
          </HeaderActions>
        </Header>
        <MainContainer>
          {loading ? (
            '加载中'
          ) : (
            <Table
              pagination={false}
              rowKey={'id'}
              columns={columns}
              dataSource={data?.imagePage.images}
            />
          )}
          {loading ? (
            '加载中'
          ) : (
            <Pagination
              style={{ marginTop: '1rem', textAlign: 'right' }}
              total={data?.imagePage.count}
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
          <PickerInline
            onSuccess={onFileUpload}
            apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
          />
        </Modal>
      </Container>
    </>
  )
}

export default CategoryPage
