import React from "react";
import Layout from "../../components/Layout";
import Users from "./Users";
import AdminSidebar from "../../components/sidebar/Sidebar";
import { adminLayoutStyle, sidebarFlexStyle, spaceFlexStyle } from "./style";

export default function Admin() {
  return (
    <Layout noCentering>
      <div style={adminLayoutStyle}>
        <div style={sidebarFlexStyle}>
          <AdminSidebar name={"admin"} />
        </div>
        <div style={spaceFlexStyle}>
          <Users />
        </div>
      </div>
    </Layout>
  );
}
