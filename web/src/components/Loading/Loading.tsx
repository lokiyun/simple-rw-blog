import { Audio } from 'react-loader-spinner'
import { useRecoilValue } from 'recoil'
import LoadingState from './Loading.store'
import styled from 'styled-components'

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #00000030;
`

const Loading = () => {
  const loadingState = useRecoilValue(LoadingState)
  return (
    loadingState && (
      <LoadingContainer>
        <Audio height={'100'} width="100" color="#0984e3" ariaLabel="loading" />
      </LoadingContainer>
    )
  )
}

export default Loading
