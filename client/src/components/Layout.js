import React from "react";
import Navbar from "./header/Navbar";
import Footer from "./footer/Footer";

const Layout = ({ children, onCart, noCentering }) => {
  const mainClass = noCentering ? "bg-image" : "d-flex justify-content-center align-items-center bg-image";
  
  return (
    <>
      <Navbar onCart={onCart} />
      <main className={mainClass} style={{ minHeight: "85vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
