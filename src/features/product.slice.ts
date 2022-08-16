import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from 'models/product.model'
import DefaultImg from '../assets/imgs/default.jpg'

type State = {
  products: Product[]
}

const initialState: State = {
  products: [
    {
      _id: '1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores praesentium, cum labore eligendi dolorum. Ratione reprehenderit',
      image: DefaultImg,
      name: 'Basic T',
      price: 12,
    },
  ],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const { payload: productToUpdate } = action
      state.products = state.products.map(product => {
        return product._id === productToUpdate._id ? productToUpdate : product
      })
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const { payload: productId } = action
      state.products = state.products.filter(
        product => product._id !== productId
      )
    },
  },
})

export const { setProducts, deleteProduct, addProduct, updateProduct } =
  productSlice.actions
export const productReducer = productSlice.reducer
