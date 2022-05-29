import styled from 'styled-components'

import banner from 'src/assets/images/banner.jpg'

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 500px;
`

const BannerImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url(${banner}) center;
  background-size: cover;
`

const Content = styled.div`
  color: #ffffff;
  z-index: 1;
`

const ContentTitle = styled.div`
  font-size: 4rem;
`

const ContentDesc = styled.div`
  font-size: 1.5rem;
  text-align: center;
`

const Banner = () => {
  return (
    <BannerContainer>
      <BannerImage />
      <Content>
        <ContentTitle>SkyWalker blog</ContentTitle>
        <ContentDesc>早服还丹无世情 琴心三叠道初成</ContentDesc>
      </Content>
    </BannerContainer>
  )
}

export default Banner
