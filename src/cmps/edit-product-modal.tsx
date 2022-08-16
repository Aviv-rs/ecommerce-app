import { useForm } from 'hooks/useForm'
import { AddProduct, EditProduct, Product } from 'models/product.model'
import React, { useEffect, useRef } from 'react'
import { uploadAndGetImgUrl } from 'services/cloudinary.service'
import { utilService } from 'services/utils'
import defaultAvatar from '../assets/imgs/default.jpg'

export const EditProductModal = ({
  product,
  updateProductFn,
  addProductFn,
  closeModalFn,
}: {
  product: EditProduct
  updateProductFn: (product: Product) => void
  addProductFn: (product: AddProduct) => void
  closeModalFn: () => void
}) => {
  const [register, productFields] = useForm({ ...product })
  const modalRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleClickOutsideMenu = ({ target }: globalThis.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(target as Node)) {
        closeModalFn()
      }
    }

    document.addEventListener('mousedown', ev => handleClickOutsideMenu(ev))
    return () => {
      document.removeEventListener('mousedown', ev =>
        handleClickOutsideMenu(ev)
      )
    }
  }, [modalRef])

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const imageUrl = productFields.image
      ? await uploadAndGetImgUrl(productFields.image)
      : defaultAvatar
    product._id
      ? updateProductFn({ ...productFields, image: imageUrl })
      : addProductFn({ ...productFields, image: imageUrl })
    closeModalFn()
  }

  return (
    <div className="edit-product-modal">
      <form
        onSubmit={ev => {
          handleSubmit(ev)
        }}
        className="modal-content flex column"
        ref={modalRef}
      >
        {Object.keys(productFields).map((field: string) => {
          if (field === '_id') return
          let inputType = field === 'price' ? 'number' : 'text'

          return (
            <div key={field} className="form-group">
              {field === 'image' ? (
                <div className="image-container">
                  <label htmlFor="image">
                    <div className="img-container">
                      <img
                        src={
                          typeof productFields.image !== 'string'
                            ? URL.createObjectURL(productFields.image)
                            : product.image
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null
                          currentTarget.src = defaultAvatar
                        }}
                        alt="Product's image"
                      />
                      <div className="add-image-txt-container flex align-center justify-center">
                        {' '}
                        <div className="add-image-txt">
                          {product._id !== undefined
                            ? 'Add image'
                            : 'Update image'}
                        </div>{' '}
                      </div>
                    </div>
                  </label>
                  <input id="image" {...register(field, '', 'file')} />
                </div>
              ) : (
                <>
                  <input
                    required
                    {...register(field, ' ', inputType)}
                    autoComplete="no"
                  />
                  <label htmlFor={field}>
                    {utilService.capitalize(field) + ' '}
                  </label>
                </>
              )}
            </div>
          )
        })}
        <button className="btn-submit" type="submit">
          {product._id ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  )
}
