import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import LoadingState from 'src/components/Loading/Loading.store'

const useLoading = (loading: boolean) => {
  const [loadingState, setLoadingState] = useRecoilState(LoadingState)

  useEffect(() => {
    console.log(loading)
    if (!loading) {
      setTimeout(() => {
        setLoadingState(loading)
      }, 500)
    } else {
      setLoadingState(loading)
    }
  }, [loading])

  return loadingState
}

export default useLoading
