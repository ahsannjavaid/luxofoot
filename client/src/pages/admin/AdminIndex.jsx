import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminSidebar from "../../components/sidebar/Sidebar";
import { adminLayoutStyle, sidebarFlexStyle, spaceFlexStyle } from "./style";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchResponse } from "../../api/service";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import { toast } from "react-toastify";
import { toastErrorObject } from "../../helper/toast";
import { userEndpoints } from "../../api/endpoints/userEndpoints";
import { useAuth } from "../../context/authContext";

export default function Admin() {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetchResponse(userEndpoints.getUsers(), 6, auth);
        if (!res.success) {
          toast.error(res.message, toastErrorObject);
          setIsLoading(false);
          navigate("/login");
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    checkAuth();
    // eslint-disable-next-line
  }, [navigate]);

  if (isLoading) <LoadingSpinner />;
  
  return (
    <Layout noCentering>
      <div style={adminLayoutStyle}>
        <div style={sidebarFlexStyle}>
          <AdminSidebar name={"admin"} />
        </div>
        <div style={spaceFlexStyle}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
