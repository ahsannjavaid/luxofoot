import React from "react";
import { sidebarStyle } from "./style";
import SidebarItem from "./SidebarItems";
import { adminSidebarList } from "../../helper/admin";

export default function AdminSidebar({ name }) {
  return (
    <div style={sidebarStyle}>
      <SidebarItem
        list={adminSidebarList}
        name={name}
      />
    </div>
  );
}
