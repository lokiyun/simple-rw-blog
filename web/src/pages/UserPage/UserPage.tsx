import { MetaTags } from '@redwoodjs/web'
import styled from 'styled-components'
import Table from 'antd/lib/table'
import { pageTransition, pageVariants } from 'src/Routes'
import { motion } from 'framer-motion'
import { useQuery } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { User } from 'types/graphql'

const usersQuery = gql`
  query Users {
    users {
      id
      username
      nickName
      avatar
      createdAt
      updatedAt
      roles
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
    title: 'username',
    dataIndex: 'username',
    key: 'username',
    width: 100,
  },
  {
    title: 'nickname',
    dataIndex: 'nickname',
    key: 'nickname',
    width: 100,
  },
  {
    title: 'avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 200,
  },
  {
    title: 'createdAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
  },
  {
    title: 'updatedAt',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 150,
  },
  {
    title: 'roles',
    dataIndex: 'roles',
    key: 'roles',
    width: 70,
  },
]

const UserPage = () => {
  const { data, loading } = useQuery(usersQuery)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    if (!loading) {
      setUsers(data.users)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <>
      <MetaTags title="User" description="User page" />

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
            <HeaderActionItem>添加用户</HeaderActionItem>
          </HeaderActions>
        </Header>
        <MainContainer>
          <Table columns={columns} dataSource={users} rowKey={'id'} />
        </MainContainer>
      </Container>
    </>
  )
}

export default UserPage
