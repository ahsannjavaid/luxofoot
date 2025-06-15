// import { BASE_URL } from "../config";

const title = "auth/";

export const userEndpoints = {
  loginUser: () => `${process.env.REACT_APP_API_URL}${title}login`,

  registerUser: () => `${process.env.REACT_APP_API_URL}${title}register`,

  getUsers: () => `${process.env.REACT_APP_API_URL}${title}get-users`,

  deleteSingleUser: (id) => `${process.env.REACT_APP_API_URL}${title}delete-single-user/${id}`,

  deleteUsers: () => `${process.env.REACT_APP_API_URL}${title}delete-users`,
};
