import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
  const [adminData, setAdminData] = useState(JSON.parse(localStorage.getItem("admin")));
  console.log("userData", userData);
  console.log("adminData", adminData);

  return (
    <authContext.Provider value={{ userData, setUserData, adminData, setAdminData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(authContext);
};
