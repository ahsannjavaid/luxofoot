import React from 'react';
import ProductCard from '../../components/Product Card/ProductCard';
import { products } from '../../helper/Products';
import Carousel from '../../components/Carousel/Carousel';
import Layout from '../../components/Layout';

const Home = () => {
  console.log(products);
  return (
    <Layout>
      <div className='bg-image'>
        <div className='container pt-5'>
          <Carousel />
          <div className='row mt-5'>
            {
              products.map(x =>
                <div key={x.id} className='col d-flex justify-content-center'>
                  <ProductCard
                    id={x.id}
                    name={x.name}
                    desc={x.madeIn}
                    img={x.image}
                    status={x.inStock}
                    price={x.price}
                  />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home;