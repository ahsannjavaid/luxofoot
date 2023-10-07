import { BASE_URL } from "../config";

const title = "auth/";

export const userEndpoints = {
  loginUser: () => `${BASE_URL}${title}login`,

  getUsers: () => `${BASE_URL}${title}get-users`,
};
