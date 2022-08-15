import { Product } from 'models/product.model'

export const ProductPreview = ({ product }: { product: Product }) => {
  return (
    <article className="product-preview flex column">
      <div className="avatar-container">
        <img src={product.image} alt="Product's photo" />
      </div>
      <div className="preview-padding">
        <div className="name-container">
          <h1 className="name">{product.name}</h1>
        </div>
        <div className="price-container">
          <span className="price">${product.price}</span>
        </div>
        {/* <div className="add-friend-container flex justify-center">
          <button className="btn-add-friend">Add Friend</button>
        </div> */}
        {/* <div className="remove-friend-container flex justify-center">
          <button className="btn-remove-friend">Remove</button>
        </div> */}
      </div>
    </article>
  )
}
