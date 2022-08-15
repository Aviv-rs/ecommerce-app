// import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { AddProduct, Product } from 'models/product.model'

const STORAGE_KEY_PRODUCT = 'product'

export const productService = {
  getProducts,
  getById,
  add,
  remove,
  update,
  getEmptyProduct,
}

function getProducts() {
  // return storageService.query('product')
  return httpService.get('product')
}

async function getById(productId: string) {
  // const product = await storageService.get('product', productId)
  const product = await httpService.get(`product/${productId}`)
  // gWatchedProduct = product;
  return product
}

function remove(productId: string) {
  // return storageService.remove('product', productId)
  return httpService.delete(`product/${productId}`)
}

async function add(product: AddProduct) {
  const savedProduct: Product = await httpService.post('product', product)
  // socketService.emit('set-product-socket', product._id);
  return savedProduct
}

async function update(product: Product) {
  // await storageService.put('product', product)
  product = await httpService.put('product', product)
  // Handle case in which admin updates other product's details
  return product
}

function getEmptyProduct(): AddProduct {
  return {
    name: '',
    image: '',
    description: '',
    price: 0,
  }
}
