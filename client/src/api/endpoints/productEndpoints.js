// import { BASE_URL } from "../config";

const title = "product/";

export const productEndpoints = {
  getProducts: () => `${process.env.REACT_APP_API_URL}${title}get-products`,

  getProductDetails: (id) => `${process.env.REACT_APP_API_URL}${title}get-single-product/${id}`
};
