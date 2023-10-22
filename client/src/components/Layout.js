import React from "react";
import Navbar from "./header/Navbar";
import Footer from "./footer/Footer";

const Layout = ({ children, onCart }) => {
  return (
    <>
      <Navbar onCart={onCart} />
        <main className="d-flex justify-content-center align-items-center bg-image" style={{ minHeight: "85vh" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
