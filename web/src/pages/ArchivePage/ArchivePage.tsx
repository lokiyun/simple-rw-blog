import { MetaTags, useQuery } from '@redwoodjs/web'
import dayjs from 'dayjs'
import styled from 'styled-components'
import Timeline from 'antd/lib/timeline'
import { Link, routes } from '@redwoodjs/router'
import useLoading from 'src/hooks/useLoading'

const MainContainer = styled.div`
  display: flex;
  width: 60%;
  margin: 2rem auto;
  margin-top: 2rem;
  padding: 4rem 4rem;
  background-color: #ffffff;
`

const getAllPosts_Q = gql`
  query getAllPosts_Q {
    posts {
      id
      title
      createdAt
    }
  }
`

const ArchiveLink = styled(Link)`
  margin-left: 2rem;
`

const NoArticle = styled.div`
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  width: 100%;
`

const ArchivePage = () => {
  const { data, loading } = useQuery(getAllPosts_Q)

  const loadingState = useLoading(loading)

  return (
    <MainContainer>
      <MetaTags title="归档" description="博客归档" />
      {!loadingState && data?.post?.length > 0 ? (
        <Timeline style={{ width: '100%' }}>
          {data?.posts?.map((item) => (
            <Timeline.Item key={item.id} style={{ whiteSpace: 'nowrap' }}>
              {dayjs(item.createdAt).format('YYYY-MM-DD')}
              <ArchiveLink
                to={routes.article({ id: item.id })}
                style={{
                  width: '60%',
                  display: 'inline-block',
                  overflowX: 'hidden',
                  textOverflow: 'ellipsis',
                  verticalAlign: 'bottom',
                }}
              >
                {item.title}
              </ArchiveLink>
            </Timeline.Item>
          ))}
        </Timeline>
      ) : (
        <NoArticle>暂无文章</NoArticle>
      )}
    </MainContainer>
  )
}

export default ArchivePage
