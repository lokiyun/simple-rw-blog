import { Link, routes } from '@redwoodjs/router'
import { memo } from 'react'
import styled from 'styled-components'
import { CategoryIcon, DateIcon, TagIcon, UserIcon } from './PostIcons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 1px 15px 0 rgb(0 0 0 / 10%);
  padding: 2rem 2rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.5s ease-in-out;

  &:hover {
    box-shadow: 0 2px 30px 0 rgb(0 0 0 / 20%);
  }
`

const PostInfos = styled.div`
  display: flex;
`

const PostInfo = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`

const PostText = styled.span`
  margin-left: 0.5rem;
`

interface PostItemProps {
  id: string
  title: string
  author: string
  createAt: string
  category: string
  tags: string[]
}

const PostItem = (props: PostItemProps) => {
  const {
    id,
    author = '佚名',
    createAt = '未知时间',
    tags,
    title,
    category = '前端',
  } = props
  return (
    <Container>
      <Link to={routes.article({ id })}>{title}</Link>
      <PostInfos>
        <PostInfo>
          <UserIcon width={16} height={16} />
          <PostText>{author}</PostText>
        </PostInfo>
        <PostInfo>
          <DateIcon width={16} height={16} />
          <PostText>{createAt}</PostText>
        </PostInfo>
        <PostInfo>
          <CategoryIcon width={16} height={16} />
          <PostText>{category}</PostText>
        </PostInfo>
        <PostInfo>
          <TagIcon width={16} height={16} />
          {tags.map((item: any) => (
            <PostText key={item.tag.id}>{item.tag.name}</PostText>
          ))}
        </PostInfo>
      </PostInfos>
    </Container>
  )
}

export default memo(PostItem)
