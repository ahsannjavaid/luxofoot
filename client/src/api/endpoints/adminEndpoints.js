import { BASE_URL } from "../config";

const title = "admin/";

export const adminEndpoints = {
  loginAdmin: () => `${BASE_URL}${title}login`,

  registerAdmin: () => `${BASE_URL}${title}register`,

  getAdmins: () => `${BASE_URL}${title}get-admins`,

  deleteSingleAdmin: (id) => `${BASE_URL}${title}delete-single-admin/${id}`,

  deleteAdmins: () => `${BASE_URL}${title}delete-admins`,
};
