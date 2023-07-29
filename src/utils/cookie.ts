import { parseCookies, setCookie, destroyCookie } from 'nookies'

export const getCookies = (key: string) => {
  const cookie = parseCookies()
  return cookie?.[key]
}

export const setCookies = (key: string, value: string) => {
  setCookie(null, key, value, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}

export const removeCookies = (key: string) => {
  destroyCookie(null, key, {
    path: '/',
  })
}
