import { ProductList } from 'cmps/product-list'
import { useSelector } from 'react-redux'
import { RootState } from 'redux-store/store'

export function HomePage() {
  const products = useSelector((state: RootState) => state.product.products)
  return (
    <section className="home-page full-screen flex">
      <main className="main-content layout-padding">
        <ProductList products={products} />
      </main>
    </section>
  )
}
