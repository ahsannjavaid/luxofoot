import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
  console.log("userData", userData);

  return (
    <authContext.Provider value={{ userData, setUserData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(authContext);
};
