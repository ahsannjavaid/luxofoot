import React, { useState } from "react";
import Layout from "../../components/Layout";
import GeneralCard from "../../components/general-card/GeneralCard";
import { useNavigate } from "react-router-dom";
import { fetchResponse } from "../../api/service";
import { userEndpoints } from "../../api/endpoints/userEndpoints";
import { toastErrorObject, toastSuccessObject } from "../../helper/utility";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";

const Signup = () => {
  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    securityAnswer: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function signup(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetchResponse(
        userEndpoints.registerUser(),
        1,
        signupDetails
      );
      const data = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      toast.success(res.message, toastSuccessObject);
      console.log("Log data", data);
      navigate("/login");
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
      <GeneralCard header={"Signup"}>
        <form onSubmit={(event) => signup(event)}>
          <div className="row">
            <div className="col">
              <label className="form-label">First Name</label>
              <input
                className="form-control mb-4"
                type="text"
                value={signupDetails.fname}
                onChange={(event) =>
                  setSignupDetails({
                    ...signupDetails,
                    fname: event.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col">
              <label className="form-label">Last Name</label>
              <input
                className="form-control mb-4"
                type="text"
                value={signupDetails.lname}
                onChange={(event) =>
                  setSignupDetails({
                    ...signupDetails,
                    lname: event.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <label className="form-label">Email</label>
          <input
            className="form-control mb-4"
            type="email"
            value={signupDetails.email}
            onChange={(event) =>
              setSignupDetails({ ...signupDetails, email: event.target.value })
            }
            required
          />
          <label className="form-label">Password</label>
          <input
            className="form-control mb-4"
            type="password"
            value={signupDetails.password}
            onChange={(event) =>
              setSignupDetails({
                ...signupDetails,
                password: event.target.value,
              })
            }
            required
          />
          <label className="form-label">What is your favourite food?</label>
          <input
            className="form-control mb-4"
            type="text"
            value={signupDetails.securityAnswer}
            onChange={(event) =>
              setSignupDetails({
                ...signupDetails,
                securityAnswer: event.target.value,
              })
            }
            required
          />
          <div className="d-flex justify-content-center">
            <button className="btn btn-sm btn-dark">Register</button>
          </div>
        </form>
      </GeneralCard>
    </Layout>
  );
};

export default Signup;
