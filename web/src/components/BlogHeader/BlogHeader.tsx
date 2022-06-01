import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import avatar from 'src/assets/images/avatar.jpg'
import { useState } from 'react'

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  box-shadow: 0 2px 5px rgb(0 0 0 / 6%);
  background-color: #ffffff;
  backdrop-filter: saturate(200%) blur(20px);
`

const BlogLogo = styled(Link)`
  margin-left: 4rem;
  font-size: 1.5rem;
  position: relative;
  margin-right: auto;

  &::before {
    content: '';
    position: absolute;
    left: -3rem;
    top: 50%;
    transform: translateY(-50%);
    width: 3rem;
    height: 3rem;
    background: url(${avatar}) center center;
    background-size: cover;
  }
`

const DashboardContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const DashboardBtn = styled.button`
  height: 2.5rem;
  padding: 0.5rem 2rem;
  background-color: #e74c3c;
  outline: none;
  border: none;
  margin-left: 1rem;
  /* line-height: 2.5rem; */
  color: #ffffff;
  margin-right: 1rem;

  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`

const DashboardLink = styled(Link)`
  margin-left: 1rem;
  padding: 0.5rem 2rem;
  background-color: ${(props) => props.theme.primary};
  color: #ffffff;
  margin-right: 1rem;

  &:hover {
    color: #ffffff;
    opacity: 0.85;
  }
`

const DashboardItem = styled.div<{ selected }>`
  text-align: center;
  height: 3.5rem;
  line-height: 3.5rem;
  padding: 0 0.7rem;
  cursor: pointer;

  color: ${(props) => (props.selected ? props.theme.second : 'inherit')};

  &:hover {
    color: ${(props) => props.theme.second};
  }
`

const BottomLine = styled(motion.div)<{ index }>`
  position: absolute;
  bottom: 0.5rem;
  left: ${(props) => props.index * 3 + 0.5 + 'rem'};
  height: 2px;
  width: ${(props) => (props.index > 1 ? '3rem' : '2rem')};
  background-color: ${(props) => props.theme.second};
`

const BlogHeader = () => {
  const { currentUser, logOut } = useAuth()
  const [selected, setSelected] = useState('首页')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const dashboard = ['首页', '归档', '关于我']

  const handleLogout = () => {
    logOut().then(() => {
      navigate(routes.login())
    })
  }

  const handleChangeIndex = (item: string, index: number) => {
    setSelected(item)
    setSelectedIndex(index)
    switch (index) {
      case 0:
        navigate(routes.home())
        break
      case 1:
        navigate(routes.archive())
        break
      case 2:
        navigate(routes.home())
        break
      default:
        navigate(routes.home())
    }
  }

  return (
    <Container>
      <BlogLogo to={routes.home()}>{'天空行者的时光屋'}</BlogLogo>
      <DashboardContainer>
        {dashboard.map((item, index) => (
          <DashboardItem
            selected={index === selectedIndex}
            key={index}
            onClick={() => handleChangeIndex(item, index)}
          >
            {item}
          </DashboardItem>
        ))}

        <BottomLine
          transition={{ duration: 0.3 }}
          layoutId={selected}
          index={selectedIndex}
        ></BottomLine>
      </DashboardContainer>
      {currentUser ? (
        <>
          <DashboardItem
            selected={false}
            onClick={() => {
              navigate(routes.user())
            }}
          >
            仪表盘
          </DashboardItem>
          <DashboardBtn onClick={handleLogout}>
            注&nbsp;&nbsp;&nbsp;&nbsp;销
          </DashboardBtn>
        </>
      ) : (
        <DashboardLink to={routes.login()}>
          登&nbsp;&nbsp;&nbsp;&nbsp;录
        </DashboardLink>
      )}
    </Container>
  )
}

export default BlogHeader
