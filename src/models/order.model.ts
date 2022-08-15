import { OrderProduct } from './product.model'

export interface Address {
  street: string
  city: string
  country: string
  postalCode: number
}

export interface Order {
  _id: string
  products: OrderProduct[]
  total: number
  date: Date
  deliveryAddress: Address
}
