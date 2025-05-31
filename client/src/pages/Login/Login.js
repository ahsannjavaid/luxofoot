import React, { useState } from "react";
import Layout from "../../components/Layout";
import { fetchResponse } from "../../api/service";
import { userEndpoints } from "../../api/endpoints/userEndpoints";
import { adminEndpoints } from "../../api/endpoints/adminEndpoints";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import GeneralCard from "../../components/general-card/GeneralCard";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastErrorObject, toastSuccessObject } from "../../helper/toast";

const Login = () => {
  const navigate = useNavigate();

  const { setUserData, setAuth } = useAuth();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function login(event) {
    event.preventDefault();
    setIsLoading(true);
    const endpoint = isAdmin ? adminEndpoints.loginAdmin() : userEndpoints.loginUser();
    try {
      const res = await fetchResponse(
        endpoint,
        1,
        loginDetails
      );
      const data = res.data;
      const token = res.token;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      toast.success(res.message, toastSuccessObject);
      console.log("Log data", data);
      setUserData(data);
      localStorage.setItem("token", token);
      setAuth(token);

      navigate("/");
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
      <GeneralCard header={"Login"}>
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
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked={isAdmin} onChange={(event) => setIsAdmin(event.target.checked)} id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Admin</label>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-sm btn-dark">Login</button>
          </div>
        </form>
      </GeneralCard>
    </Layout>
  );
};

export default Login;
