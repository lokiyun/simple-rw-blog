import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import styled from 'styled-components'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css'
import { useState } from 'react'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import { useLazyQuery } from '@apollo/client'
import { categoryQuery } from '../CategoryPage/CategoryPage'
import { Category, Tag } from 'types/graphql'
import { createTagMutation, tagQuery } from '../TagPage/TagPage'
import { unstable_batchedUpdates } from 'react-dom'
import { useAuth } from '@redwoodjs/auth'

const createPostTagMutation = gql`
  mutation createPostTagMutation($input: CreatePostTagInput!) {
    createPostTag(input: $input) {
      id
      tagId
      postId
    }
  }
`

const createPostMutation = gql`
  mutation createPostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`

const Container = styled.div`
  /* padding: 1rem; */
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 3rem;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.body};
`

const BackBtn = styled(Link)`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.primary};
  color: #ffffff;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 0.2rem;

  &:hover {
    opacity: 0.8;
    color: #ffffff;
  }
`

const SubmitBtn = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.second};
  color: #ffffff;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 0.2rem;

  &:hover {
    opacity: 0.8;
    color: #ffffff;
  }
`

const Wrapper = styled.div`
  padding: 2rem 4rem;
  display: flex;
`

const Main = styled.main`
  flex: 1;
`

const mdParser = new MarkdownIt(/* Markdown-it options */)

// Finish!

const ArticleWritePage = () => {
  const { currentUser } = useAuth()
  const [getCategory, { data: categoryList }] = useLazyQuery(categoryQuery)
  const [getTag, { data: tagList }] = useLazyQuery(tagQuery)

  const [createTag] = useMutation(createTagMutation)
  const [createPostTag] = useMutation(createPostTagMutation)
  const [createPost] = useMutation(createPostMutation)

  const [content, setContent] = useState('')
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [uploadTags, setUploadTags] = useState<string[]>([])

  function handleEditorChange({ text }) {
    setContent(text)
  }

  const handleSubmit = () => {
    if (content === '') return
    else {
      setOpen(true)
      getCategory()
      getTag()
    }
  }

  const handleUpload = () => {
    const plist = []
    // 保存新的tag
    uploadTags.forEach((item: string) => {
      plist.push(
        createTag({
          variables: {
            input: {
              name: item,
            },
          },
        })
      )
    })

    // -> 1.创建所有未保存的标签
    Promise.all(plist)
      .then(() => {
        // -> 2.创建文章
        return createPost({
          variables: {
            input: {
              title,
              desc,
              content,
              categoryId: category,
              userId: currentUser.id,
            },
          },
        })
      })
      .then((res) => {
        // -> 3.为文章和标签建立关联
        const id = res.data.createPost.id
        return getTag().then((res) => {
          const resultTags = res.data.tags.filter((item: Tag) =>
            tags.some((tag) => tag === item.name)
          )
          const list = []
          list.push()
          resultTags.forEach((item: Tag) => {
            list.push(
              createPostTag({
                variables: {
                  input: {
                    tagId: item.id,
                    postId: id,
                  },
                },
              })
            )
          })

          return Promise.all(list)
        })
      })
      .then((res) => {
        console.log(res)
        // -> 4. 关闭弹窗并返回文章页面
        unstable_batchedUpdates(() => {
          setOpen(false)
          navigate(routes.post())
        })
      })
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const onChange = (value: string) => {
    setCategory(value)
  }

  const onSearch = (value: string) => {
    console.log('search:', value)
  }

  const handleChangeTags = (value: string[]) => {
    const temp = value.filter((item) =>
      tagList.tags.every((tag) => tag.name !== item)
    )
    unstable_batchedUpdates(() => {
      setUploadTags(temp)
      setTags(value)
    })
  }

  return (
    <>
      <MetaTags title="ArticleWrite" description="ArticleWrite page" />

      <Container>
        <Header>
          <BackBtn to={routes.post()}>返回</BackBtn>
          <SubmitBtn onClick={handleSubmit}>提交</SubmitBtn>
        </Header>
        <Wrapper>
          <Main>
            <MdEditor
              style={{
                height: '700px',
                maxHeight: '700px',
                minHeight: '400px',
              }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </Main>
        </Wrapper>
        <Modal
          title="添加标签"
          visible={open}
          onOk={handleUpload}
          onCancel={handleCancel}
        >
          <Input
            placeholder="请输入标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input.TextArea
            style={{ margin: '1rem 0' }}
            placeholder="请输入描述"
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Select
            showSearch
            placeholder="选择分类"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {categoryList?.categories.map((item: Category) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            mode="tags"
            style={{ width: '100%', marginTop: '1rem' }}
            placeholder="选择标签(可多选)"
            onChange={handleChangeTags}
          >
            {tagList?.tags.map((item: Tag) => (
              <Select.Option key={item.id} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Modal>
      </Container>
    </>
  )
}

export default ArticleWritePage
