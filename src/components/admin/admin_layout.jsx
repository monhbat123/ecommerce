import { Layout } from "antd";
import AdminContent from "./admin_content";
import { getVars } from "@/main";
import Sidebar from "./sidebar";
import AdminHeader from "./admin_header";
export default function AdminLayout({ location }) {
  const sidebar_data = getVars("menus");

  return (
    <>
      <AdminHeader />
      <Layout>
        <Sidebar sidebar={sidebar_data} defaultPage={location.pathname} />
        <Layout>
          <AdminContent />
        </Layout>
      </Layout>
    </>
  );
}
