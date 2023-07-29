import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { loginRequest } from '../services/auth/request'
import { useAppDispatch } from '../services/hooks'
import { setIsLogin } from '../stores/mainSlice'
import { handleErrorMutate } from '../utils'
import { STORAGE_KEY } from '../utils/constant'
import { getCookies, removeCookies, setCookies } from '../utils/cookie'

export const useUserAuth = () => {
  const token = getCookies(STORAGE_KEY.token)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { mutate, isLoading } = useMutation(loginRequest, {
    onSuccess: async (data) => {
      router.push('/')
      dispatch(setIsLogin({ isLogin: true }))
      setCookies(STORAGE_KEY.token, data?.token)
      setCookies(STORAGE_KEY.email, data?.email)
    },
    onError: handleErrorMutate,
  })

  const logout = () => {
    dispatch(setIsLogin({ isLogin: false }))

    removeCookies(STORAGE_KEY.token)
  }

  return { loginFunc: mutate, isLoading, logout, token }
}
