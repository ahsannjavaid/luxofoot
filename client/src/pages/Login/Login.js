import React, { useState } from "react";
import Layout from "../../components/Layout";
import { fetchResponse } from "../../api/service";
import { userEndpoints } from "../../api/endpoints/userEndpoints";
import LoadingSpinner from "../../components/loading_spinner/LoadingSpinner";
import GeneralCard from "../../components/general_card/GeneralCard";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { setUserData } = useAuth();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function login(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetchResponse(userEndpoints.loginUser(), 1, loginDetails);
      const data = res.data;
      console.log(data);
      setUserData(data);
      setIsLoading(false);
      if (res.success) navigate("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <GeneralCard header={<>Login</>}>
        <form onSubmit={(event) => login(event)}>
          <label className="form-label">Email</label>
          <input
            className="form-control mb-4"
            type="email"
            value={loginDetails.email}
            onChange={(event) =>
              setLoginDetails({ ...loginDetails, email: event.target.value })
            }
            required
          />
          <label className="form-label">Password</label>
          <input
            className="form-control mb-4"
            type="password"
            value={loginDetails.password}
            onChange={(event) =>
              setLoginDetails({ ...loginDetails, password: event.target.value })
            }
            required
          />
          <button className="btn btn-sm btn-dark">Login</button>
        </form>
      </GeneralCard>
    </Layout>
  );
};

export default Login;
