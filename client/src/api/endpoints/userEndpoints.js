import { BASE_URL } from "../config";

const title = "auth/";

export const userEndpoints = {
  loginUser: () => `${BASE_URL}${title}login`,

  registerUser: () => `${BASE_URL}${title}register`,

  getUsers: () => `${BASE_URL}${title}get-users`,
};
