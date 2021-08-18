import { Link } from "react-router-dom";
import { Menu } from "antd";

export default function SideBarItem(p) {
  let { sidebar, defaultPage } = p;

  return (
    <Menu defaultSelectedKeys={defaultPage} mode="vertical" className="menu">
      {sidebar.map((q) => {
        return (
          <Menu.Item
            key={q.key}
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            {q.name}
            <Link to={q.link} />
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
