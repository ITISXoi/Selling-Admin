/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios'
import { AxiosError } from 'axios'
import { STORAGE_KEY } from '../utils/constant'
import { getCookies, removeCookies } from '../utils/cookie'
export const request = axios.create({
  baseURL: 'https://bitkub-bittoon-api.var-meta.com/',
})

const handleError = async (error: AxiosError) => {
  const data: any = error?.response?.data

  const originalRequest: any = error.config
  const isTokenExpired = error?.response?.status === 401 || error?.response?.status === 503

  if (isTokenExpired && !originalRequest._retry) {
    removeCookies(STORAGE_KEY.token)
    return Promise.reject(data?.meta || data || error)
  }

  return Promise.reject(data?.meta || data || error)
}

const handleSuccess = async (res: any) => {
  return res.data
}

const handleRequest = async (config: AxiosRequestConfig) => {
  const token = getCookies(STORAGE_KEY.token);

    if (token) {
      config = {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return config;
}

request.interceptors.response.use(handleSuccess, handleError)

request.interceptors.request.use(handleRequest, (error) => Promise.reject(error))
