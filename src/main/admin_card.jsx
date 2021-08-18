import { Card } from "antd";
export default function AdminCard(props) {
  return (
    <Card
      title={props.title}
      extra={props.extra}
      loading={props.loading}
      style={{ width: "100%", height: "100vh" }}
    >
      <div className="admin_card_body">{props.children}</div>
    </Card>
  );
}
