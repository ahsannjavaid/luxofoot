import { BASE_URL } from "../config";

const title = "product/";

export const productEndpoints = {
  getProducts: () => `${BASE_URL}${title}get-products`,
};
