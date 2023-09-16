import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout';

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <Layout>
      ProductDetails of Product with Id <span className='fw-bold'>{id}</span>
    </Layout>
  )
}

export default ProductDetails