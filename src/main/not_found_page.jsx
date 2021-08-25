import { Result, Button } from "antd";

export default function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Уучлаарай, ийм хуудас олдсонгүй."
      extra={<Button type="primary">Нүүрлүү буцах</Button>}
    />
  );
}
