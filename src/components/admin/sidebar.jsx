import React from "react";
import { Layout } from "antd";
import SidebarItem from "./sidebar_item";

const { Sider } = Layout;

export default function Sidebar(props) {
  return (
    <Sider
      className="sider"
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh" }}
    >
      <SidebarItem className="sidebar_item" {...props} />
    </Sider>
  );
}
