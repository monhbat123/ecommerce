import { useEffect, useState } from "react";
import { AdminCard, firebase } from "@/main";
import { Table, Card } from "antd";
import moment from "moment";
import BrandAdd from "./admin_brand_add";
import BrandUpdate from "./admin_brand_update";
import BrandDelete from "./admin_brand_delete";
export default function AdminBrand() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase.db.collection("Brand").onSnapshot((querySnapshot) => {
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
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Нэр (English)",
      dataIndex: "nameEn",
      key: "nameEn",
    },
    {
      title: "Засах / Харах",
      render: (a) => {
        return <BrandUpdate defaultData={a} loader={setLoading} />;
      },
    },
    {
      title: "Устгах",
      dataIndex: "key",
      key: "key",
      render: (a) => {
        return <BrandDelete id={a} loader={setLoading} />;
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
    <AdminCard title="Брэнд" loading="">
      <Card extra={<BrandAdd loader={setLoading} />}>
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
