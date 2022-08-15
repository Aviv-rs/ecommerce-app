import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Msg, User } from 'models/user.model'
import { userService } from 'services/user.service'

type State = {
  userMsg: Msg | null
  loggedinUser: User | null
}

const initialState: State = {
  userMsg: null,
  loggedinUser: userService.getLoggedinUser(),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.loggedinUser = action.payload
    },
    setUserMsg: (state, action: PayloadAction<Msg | null>) => {
      state.userMsg = action.payload
    },
  },
})

export const { setUser, setUserMsg } = userSlice.actions
export const userReducer = userSlice.reducer
