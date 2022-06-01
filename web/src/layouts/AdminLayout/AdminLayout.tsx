import { useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { navigate, routes } from '@redwoodjs/router'

import './index.css'
import { useRecoilState } from 'recoil'
import { adminIndexState } from './index.store'

type AdminLayoutProps = {
  children?: React.ReactNode
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 250px;
  height: 100%;
  overflow-y: auto;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
`

const Main = styled.main`
  position: relative;
  flex: 1;
  overflow: auto;
`

const Logo = styled.div`
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`

const AsideItem = styled.div`
  height: 3rem;
  line-height: 3rem;
  text-indent: 2rem;
  margin: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 2rem;
  z-index: 1111;
`

const AsideSelected = styled(motion.div)<{ index: number }>`
  position: absolute;
  background-color: ${(props) => props.theme.primary};
  color: #ffffff;
  height: 3rem;
  width: 100%;
  top: ${(props) => props.index * 4 + 4.5 + 'rem'};
`

const BackBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;

  font-size: 1rem;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    opacity: 0.85;
    background-color: ${(props) => props.theme.primary};
    color: #ffffff;
  }
`

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const asideList = [
    {
      label: '用户管理',
      url: '/admin/user',
    },
    {
      label: '文章管理',
      url: '/admin/post',
    },
    {
      label: '分类管理',
      url: '/admin/category',
    },
    {
      label: '标签管理',
      url: '/admin/tag',
    },
    {
      label: '图片管理',
      url: '/admin/image',
    },
  ]

  const [adminIndex, setIndex] = useRecoilState(adminIndexState)
  const [selectLabel, setSelectLabel] = useState('用户管理')

  const handleChangeIndex = (index: number) => {
    unstable_batchedUpdates(() => {
      setSelectLabel(asideList[index].label)
      setIndex(index)
    })

    sessionStorage.setItem('admin-index', index.toString())
    navigate(asideList[index].url)
  }

  return (
    <Container>
      <Aside>
        <Logo>博客后台管理系统</Logo>
        {asideList.map((item, index) => (
          <AsideItem onClick={() => handleChangeIndex(index)} key={item.label}>
            {item.label}
          </AsideItem>
        ))}
        <AsideSelected index={adminIndex} layoutId={selectLabel} />
        <BackBtn
          onClick={() => {
            navigate(routes.home())
          }}
        >
          返回博客
        </BackBtn>
      </Aside>

      <Main>{children}</Main>
    </Container>
  )
}

export default AdminLayout
