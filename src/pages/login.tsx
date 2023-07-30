/* eslint-disable @next/next/no-img-element */
import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { auth, provider } from '../../firebase'
import SectionFullScreen from '../components/SectionFullScreen'
import { getPageTitle } from '../config'
import { useAppDispatch } from '../services/hooks'
import { setIsLogin } from '../stores/mainSlice'
import { STORAGE_KEY } from '../utils/constant'
import { setCookies } from '../utils/cookie'

export default function Login() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data: any) => {
        toast.success('Login Success!')
        dispatch(setIsLogin({ isLogin: true }))
        router.push('/')
        setCookies(STORAGE_KEY.token, data.user.accessToken)
        setCookies(STORAGE_KEY.email, data.user.email)
        setCookies(STORAGE_KEY.name, data.user.displayName)
      })
      .catch(() => {
        toast.error('Login fail!')
      })
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>
      <SectionFullScreen bg="purplePink">
        <Button variant="contained" onClick={handleClick}>
          Signin With Google
        </Button>
      </SectionFullScreen>
    </>
  )
}
