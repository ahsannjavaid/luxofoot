import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from 'react-toastify';
import { toastSuccessObject } from "../../helper/toast";

const Navbar = ({ onCart }) => {
  const { auth, setUserData, setAuth } = useAuth();

  function logout() {
    setUserData(null);
    localStorage.removeItem("token");
    setAuth(null);
    toast.success("Logged out successfully!", toastSuccessObject);
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-light"
        style={{ backgroundColor: "white" }}
      >
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            <img src="./assets/Logo 2.0.png" alt="logo" width={100} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              <NavLink className="nav-item nav-link" to={"/"}>
                HOME
              </NavLink>
              <NavLink className="nav-item nav-link" to={"/signup"}>
                SIGNUP
              </NavLink>
              {auth ? (
                <Link onClick={logout} className="nav-item nav-link" to={"/"}>
                  LOGOUT
                </Link>
              ) : (
                <NavLink className="nav-item nav-link" to={"/login"}>
                  LOGIN
                </NavLink>
              )}
            </div>
            <div className="navbar-nav mx-end">
              <NavLink to={"/cart"}>
                <img
                  className="me-2"
                  src="../assets/Cart Black.png"
                  alt="cart"
                  height="30px"
                  width="30px"
                  style={{ opacity: `${onCart ? "1" : "0.7"}` }}
                />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
