import { navigate, routes } from '@redwoodjs/router'
import { Form, useForm } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { useRecoilState } from 'recoil'
import LoadingState from 'src/components/Loading/Loading.store'

const TextInput = styled(Input)`
  outline: none;
  border: 1px solid #eee;
  /* padding: 0.5rem 1rem; */
  background-color: #ffffff;
`

const FormLabel = styled.label`
  white-space: nowrap;
`

const Container = styled.div`
  display: flex;
  width: 60vw;
  height: 100vh;
  margin: 0 auto;
  position: relative;
`

const FormWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 3rem 4rem 4rem 4rem;
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  &:hover {
    transition: all 0.2s ease-in-out;
  }
`

const FormItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const form = useForm()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [_, setLoading] = useRecoilState(LoadingState)

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.user())
    }
  }, [isAuthenticated])

  const onSubmit = async () => {
    await logIn({
      username,
      password,
    }).then(() => {})
  }

  return (
    <>
      <MetaTags title="Login" />

      <Container>
        <FormWrapper>
          <Form onSubmit={onSubmit} formMethods={form}>
            <FormItem>
              <FormLabel>用户名：</FormLabel>
              <TextInput
                placeholder="请输入密码"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormItem>

            <FormItem>
              <FormLabel>密&nbsp;&nbsp;&nbsp;&nbsp;码：</FormLabel>
              <TextInput.Password
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormItem>

            <FormItem>
              <Button type="primary" block htmlType="submit">
                登录
              </Button>
            </FormItem>
          </Form>
        </FormWrapper>
      </Container>
    </>
  )
}

export default LoginPage
