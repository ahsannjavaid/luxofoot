import { toast } from 'react-toastify';
import { productEndpoints } from '../api/endpoints/productEndpoints';
import { fetchResponse } from '../api/service';
import { toastErrorObject } from './toast';

export async function fetchData(setData, setIsLoading, req, bodyData) {
  try {
    let res;
    if (req) res = await fetchResponse(productEndpoints.getProductDetails(bodyData), 0, null);
    else res = await fetchResponse(productEndpoints.getProducts(), 0, bodyData);
    const resData = res.data;
    if (!res.success) {
      toast.error(res.message, toastErrorObject);
      setIsLoading(false);
      return;
    }
    console.log('Log data', resData);
    if (req) {
      const images = new Array(5).fill(`${process.env.REACT_APP_API_URL}product/get-photo/${bodyData}`);
      resData.images = images;
    }
    setData(resData);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
}

// export async function deleteRecords(setShowModal, setIsLoading, setData, req) {
//     setShowModal(false);
//     setIsLoading(true);
//     let res;
//     try {
//       if (req) res = await fetchResponse(adminEndpoints.deleteAdmins(), 3, null);
//       else res = await fetchResponse(userEndpoints.deleteUsers(), 3, null);
//       const resData = res.data;
//       if (!res.success) {
//         toast.error(res.message, toastErrorObject);
//         setIsLoading(false);
//         return;
//       }
//       console.log("Log data", resData);
//       toast.success(res.message, toastSuccessObject);
//       setData([]);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   }