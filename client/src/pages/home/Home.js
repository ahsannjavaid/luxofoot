import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/product-card/ProductCard';
import Carousel from '../../components/carousel/Carousel';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';
import { fetchData } from '../../helper/product';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(setProducts, setIsLoading, 0, null);
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <div className='container mt-4'>
          <Carousel />
          <div className='row mt-5'>
            {
              products.map(x =>
                <div key={x._id} className='col d-flex justify-content-center'>
                  <ProductCard
                    id={x._id}
                    name={x.name}
                    desc={x.description}
                    img={`${process.env.REACT_APP_API_URL}product/get-photo/${x._id}`}
                    status={x.isAvailable}
                    price={x.price}
                  />
                </div>
              )
            }
          </div>
        </div>
    </Layout>
  )
}

export default Home;