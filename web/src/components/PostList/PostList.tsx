import styled from 'styled-components'
import PostItem from '../PostItem/PostItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  width: 80%;
`

const PostList = ({ data }) => {
  return (
    <Container>
      {data?.map((item) => (
        <PostItem
          id={item.id}
          author={item?.author?.username}
          title={item.title}
          createAt={item?.createdAt}
          category={item?.category?.name}
          tags={item?.PostTag}
          key={item.id}
        />
      ))}
    </Container>
  )
}

export default PostList
