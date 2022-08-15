import { Order } from './order.model'

export interface User {
  _id: string
  fullname: string
  username: string
  role: string
  orders: Order[]
}

export interface UserCredSignup {
  fullname: string
  username: string
  password: string
}

export interface UserCredLogin {
  username: string
  password: string
}

export interface UserCredEdit {
  _id?: string
  avatar: string
  username: string
  fullname: string
  password?: string
}

export interface Msg {
  type: string
  txt: string
}
