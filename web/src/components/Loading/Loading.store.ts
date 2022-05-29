import { atom } from 'recoil'

const LoadingState = atom({
  key: 'LoadingState',
  default: false,
})

export default LoadingState
