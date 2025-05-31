import { BASE_URL } from "../config";

const title = "admin/";

export const adminEndpoints = {
  loginAdmin: () => `${process.env.REACT_APP_API_URL}${title}login`,

  registerAdmin: () => `${process.env.REACT_APP_API_URL}${title}register`,

  getAdmins: () => `${process.env.REACT_APP_API_URL}${title}get-admins`,

  deleteSingleAdmin: (id) => `${process.env.REACT_APP_API_URL}${title}delete-single-admin/${id}`,

  deleteAdmins: () => `${process.env.REACT_APP_API_URL}${title}delete-admins`,
};
