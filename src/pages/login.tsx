import React from 'react'
import Head from 'next/head'

import SectionFullScreen from '../components/SectionFullScreen'

import { getPageTitle } from '../config'
import { GoogleLogin } from '@react-oauth/google'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useUserAuth } from '../hooks/useAuthUser'

export default function Login() {
  const router = useRouter()
  const { loginFunc } = useUserAuth()

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const paramsLogin = {
              tokenId: String(credentialResponse.credential),
            }
            router.push('/')

            loginFunc(paramsLogin)
          }}
          onError={() => {
            toast.error('Login Failed !', {
              position: toast.POSITION.TOP_RIGHT,
            })
          }}
          theme="filled_blue"
          ux_mode="popup"
          type="standard"
          size="large"
          text="signin_with"
          logo_alignment="left"
        />
      </SectionFullScreen>
    </>
  )
}
