import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  const [userData, setUserData] = useState();
  const [adminData, setAdminData] = useState();

  return (
    <authContext.Provider value={{ userData, setUserData, adminData, setAdminData, auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(authContext);
};
