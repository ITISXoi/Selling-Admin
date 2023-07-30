import { useAppDispatch } from '../services/hooks'
import { setIsLogin } from '../stores/mainSlice'
import { STORAGE_KEY } from '../utils/constant'
import { getCookies, removeCookies } from '../utils/cookie'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
export const useUserAuth = () => {
  const token = getCookies(STORAGE_KEY.token)
  const dispatch = useAppDispatch()
  const logout = () => {
    signOut(auth).then(() => {
      toast.success('Signout Success!')
    })
    dispatch(setIsLogin({ isLogin: false }))
    removeCookies(STORAGE_KEY.token)
  }

  return { logout, token }
}
