import React, { useEffect, useState } from 'react'
import DynamicTable from '../../../components/table/DynamicTable';
import { fetchData } from '../../../helper/product';
import WideButton from '../../../components/button/WideButton';
import LoadingSpinner from '../../../components/loading-spinner/LoadingSpinner';

export default function ShowProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      fetchData(setProducts, setIsLoading, 0, null);
      // eslint-disable-next-line
    }, []);
  
    if (isLoading) {
      return <LoadingSpinner />;
    }
  
    return (
      <div>
        {products?.length ? (
            <WideButton
              onClick={() => setShowModal(true)}
              btnColor={"danger"}
              name={"Delete All"}
            />
        ) : null}
        <DynamicTable
        styles={'table-sm table-bordered table-striped text-center'}
        headers={['Name', 'Price', 'Description', 'In Stock', 'Quantity', 'Date Created']}
        data={products}
        dataAttributes={['name', 'price', 'description', 'isAvailable', 'quantity', 'createdAt']}
        />
        {/* <ConfirmationModal
          showModal={showModal}
          setShowModal={setShowModal}
          message={"Are you sure to delete all the products?"}
          action={() => deleteRecords(setShowModal, setIsLoading, setProducts, 0)}
        /> */}
      </div>
    );
}
