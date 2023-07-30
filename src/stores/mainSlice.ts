import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginPayload, UserPayloadObject } from '../interfaces'
import { STORAGE_KEY } from '../utils/constant'
import { getCookies } from '../utils/cookie'

interface MainState {
  userName: string
  userEmail: null | string
  userAvatar: null | string
  isFieldFocusRegistered: boolean
  isLogin: boolean
}

const initialState: MainState = {
  /* User */
  userName: '',
  userEmail: null,
  userAvatar: null,

  /* Field focus with ctrl+k (to register only once) */
  isFieldFocusRegistered: false,
  // isLogin: Boolean(getCookies(STORAGE_KEY.token)),
  isLogin: Boolean(getCookies(STORAGE_KEY.token)),
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userName = action.payload.name
      state.userEmail = action.payload.email
      state.userAvatar = action.payload.avatar
    },
    setIsLogin: (state, action: PayloadAction<LoginPayload>) => {
      state.isLogin = action.payload.isLogin
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setIsLogin } = mainSlice.actions

export default mainSlice.reducer
