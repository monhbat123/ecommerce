import { Card } from "antd";

const { Meta } = Card;
export default function example() {
  return (
    <Card
      hoverable
      className="product_card"
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta title="Бараа" description="Барааны мэдээлэл" />
    </Card>
  );
}
