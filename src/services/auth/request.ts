import { request } from '../axios'
import { IAuthParams, ICreateAccountRequest, ILoginResponse, IResponAccount } from './types'

export const loginRequest = async (params: IAuthParams): Promise<ILoginResponse> => {
  const { data } = await request({
    url: '/admin/login',
    method: 'POST',
    data: params,
  })

  return data
}

export const createUser = async (params: ICreateAccountRequest): Promise<IResponAccount> => {
  const { data } = await request({
    url: '/admin/create-user',
    method: 'POST',
    data: params,
  })

  return data
}

export const createAdmin = async (params: ICreateAccountRequest): Promise<IResponAccount> => {
  const { data } = await request({
    url: '/admin/create-admin',
    method: 'POST',
    data: params,
  })

  return data
}

export const createSuperAdmin = async (params: ICreateAccountRequest): Promise<IResponAccount> => {
  const { data } = await request({
    url: '/admin/create-super-admin',
    method: 'POST',
    data: params,
  })

  return data
}