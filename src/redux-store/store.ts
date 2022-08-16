import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from 'features/product.slice'
import { userReducer } from 'features/user.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
