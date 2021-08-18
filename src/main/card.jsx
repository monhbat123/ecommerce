import { Card, Avatar } from "antd";

const { Meta } = Card;
export default function example() {
  return (
    <Card style={{ width: "100%", marginBottom: 5 }}>
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title="Мэдээ"
        description="This is the description"
      />
    </Card>
  );
}
