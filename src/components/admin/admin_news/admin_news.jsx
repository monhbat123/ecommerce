import { useEffect, useState } from "react";
import { AdminCard, firebase } from "@/main";
import { Table, Card } from "antd";
import moment from "moment";
import NewsAdd from "./admin_news_add";
import NewsUpdate from "./admin_news_update";
import NewsDelete from "./admin_news_delete";
export default function AdminBrand() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase.db.collection("News").onSnapshot((querySnapshot) => {
      const brand = [];
      querySnapshot.forEach((documentSnapshot) => {
        brand.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setData(brand);
      setLoading(false);
    });
  }, [loading]);
  const columns = [
    {
      title: "Гарчиг",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Гарчиг (English)",
      dataIndex: "titleEn",
      key: "titleEn",
    },
    {
      title: "Засах / Харах",
      render: (a) => {
        return <NewsUpdate defaultData={a} loader={setLoading} />;
      },
    },
    {
      title: "Устгах",
      dataIndex: "key",
      key: "key",
      render: (a) => {
        return <NewsDelete id={a} loader={setLoading} />;
      },
    },
    {
      title: "Үүсгэсэн огноо",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (a) => moment(a).format(),
    },
  ];
  return (
    <AdminCard title="Мэдээ" loading="">
      <Card extra={<NewsAdd loader={setLoading} />}>
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          size="small"
          bordered="true"
          scroll={{ x: 1300 }}
        />
      </Card>
    </AdminCard>
  );
}
