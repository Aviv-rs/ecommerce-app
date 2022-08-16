import { EditProductModal } from 'cmps/edit-product-modal'
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from 'features/product.slice'
import { Product, AddProduct, EditProduct } from 'models/product.model'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux-store/store'
import { productService } from 'services/product.service'

export const AdminPage = () => {
  const products = useSelector((state: RootState) => state.product.products)
  const loggedinUser = useSelector(
    (state: RootState) => state.user.loggedinUser
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState({} as EditProduct)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedinUser?.role !== 'admin') navigate('/')
  }, [])

  // TODO: connect a server + db that the productservice can use it
  const onDeleteProduct = async (productId: string) => {
    // await productService.remove(productId)
    dispatch(deleteProduct(productId))
  }

  const onUpdateProduct = async (product: Product) => {
    // const savedProduct = await productService.update({
    //   ...product,
    // } as Product)
    dispatch(updateProduct(product))
  }

  const onAddProduct = async (product: AddProduct) => {
    // const savedProduct = await productService.add(product)
    const savedProduct = { ...product, _id: Date.now() + '' }
    dispatch(addProduct(savedProduct))
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="admin-page full-screen flex column align-center">
      <h1>Admin dashboard</h1>
      <div className="container">
        <button
          className="btn-add"
          onClick={() => {
            setProductToEdit(productService.getEmptyProduct())
            setIsModalOpen(true)
          }}
        >
          Add product
        </button>
      </div>
      <table className="products-table">
        <thead>
          <tr>
            <th className="column1">Product image</th>
            <th>Name</th>
            <th>Price</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => {
            const { image, name, price, _id, description } = product
            const updateFields = { image, name, price, _id, description }
            return (
              <tr key={product._id} className="product-info-row">
                <td className="column1">
                  <div className="avatar">
                    <img src={image} alt="" />
                  </div>
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <div className="actions flex">
                    <button
                      onClick={() => {
                        setIsModalOpen(true)
                        setProductToEdit(updateFields)
                      }}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {isModalOpen && (
        <EditProductModal
          product={productToEdit}
          updateProductFn={onUpdateProduct}
          addProductFn={onAddProduct}
          closeModalFn={closeModal}
        />
      )}
    </section>
  )
}
