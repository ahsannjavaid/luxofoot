import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fetchResponse } from "../../api/service";
import { userEndpoints } from "../../api/endpoints/userEndpoints";
import LoadingSpinner from "../../components/loading_spinner/LoadingSpinner";

const Login = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetchResponse(userEndpoints.getUsers());
        const data = res.data;
        console.log(data);
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <Layout>{JSON.stringify(userData)}</Layout>;
};

export default Login;
