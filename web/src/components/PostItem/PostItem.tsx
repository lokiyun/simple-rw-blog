import { Link, routes } from '@redwoodjs/router'
import { memo, useEffect } from 'react'
import styled from 'styled-components'
import { CategoryIcon, DateIcon, TagIcon, UserIcon } from './PostIcons'
import dayjs from 'dayjs'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 1px 15px 0 rgb(0 0 0 / 10%);
  padding: 1rem 2rem 1.5rem 2rem;
  margin-bottom: 1.5rem;
  transition: box-shadow 0.5s ease-in-out;

  &:hover {
    box-shadow: 0 2px 30px 0 rgb(0 0 0 / 20%);
  }
`

const Title = styled(Link)`
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.85;
  margin-bottom: 0.5rem;
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${Container}:hover & {
    text-decoration: underline;
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
  categoryId: string
  tags: string[]
}

const PostItem = (props: PostItemProps) => {
  const { id, author, createAt, tags, title, category, categoryId } = props

  useEffect(() => {
    if (createAt) {
      console.log()
    }
  }, [createAt])

  return (
    <Container>
      <Title to={routes.article({ id })}>{title}</Title>
      <PostInfos>
        <PostInfo>
          <UserIcon width={16} height={16} />
          <PostText>{author}</PostText>
        </PostInfo>
        <PostInfo>
          <DateIcon width={16} height={16} />
          <PostText>{dayjs(createAt).format('YYYY-MM-DD HH:MM:SS')}</PostText>
        </PostInfo>
        <PostInfo>
          <CategoryIcon width={16} height={16} />
          <PostText>
            <Link to={routes.articlesByCategory({ id: categoryId })}>
              {category}
            </Link>
          </PostText>
        </PostInfo>
        <PostInfo>
          {tags && tags.length > 0 && <TagIcon width={16} height={16} />}

          {tags.map((item: any) => (
            <PostText key={item.tag.id}>{item.tag.name}</PostText>
          ))}
        </PostInfo>
      </PostInfos>
    </Container>
  )
}

export default memo(PostItem)
