import React from "react";
import Layout from "../../components/Layout";
import AdminSidebar from "../../components/sidebar/Sidebar";
import { adminLayoutStyle, sidebarFlexStyle, spaceFlexStyle } from "./style";
import { Outlet } from "react-router-dom";

export default function Admin() {
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
