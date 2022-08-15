import { Product } from 'models/product.model'
import { ProductPreview } from './product-preview'

export const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <section className="product-list grid align-center">
      {products.map((product: Product) => {
        return <ProductPreview key={product._id} product={product} />
      })}
    </section>
  )
}
