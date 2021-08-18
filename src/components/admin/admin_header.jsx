import { useContext } from "react";
import { Menu, Dropdown, message } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { firebase, UserContext } from "@/main";
export default function AdminHeader() {
  const { email } = useContext(UserContext);
  function logOut() {
    firebase.auth
      .signOut()
      .then(() => {
        console.log("loged out");
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleMenuClick() {
    message.info("Амжилттай галаа.");
    logOut();
  }
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          handleMenuClick();
        }}
        key="1"
        icon={<LogoutOutlined />}
      >
        Гарах
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="admin_header_container">
      <Dropdown.Button
        overlay={menu}
        placement="bottomCenter"
        icon={<UserOutlined />}
        style={{ margin: 7 }}
        type="primary"
      >
        {email}
      </Dropdown.Button>
    </div>
  );
}
