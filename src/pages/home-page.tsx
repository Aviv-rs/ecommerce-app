import { ProductList } from 'cmps/product-list'
import DefaultImg from '../assets/imgs/default.jpg'

export function HomePage() {
  return (
    <section className="home-page full-screen flex">
      <main className="main-content layout-padding">
        <ProductList
          products={[
            {
              _id: '1',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores praesentium, cum labore eligendi dolorum. Ratione reprehenderit',
              image: DefaultImg,
              name: 'Basic T',
              price: 12,
            },
          ]}
        />
      </main>
    </section>
  )
}
