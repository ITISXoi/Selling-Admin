export interface IAuthParams {
  tokenId: string
}

export interface ILoginResponse {
  email: string
  id: number
  type: number
  token: string
}
export interface ICreateAccountRequest {
  email: string
}

export interface IResponAccount {
  id: number;
  email: string;
  username: string;
}