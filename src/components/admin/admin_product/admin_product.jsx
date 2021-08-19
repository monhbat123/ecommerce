import { useEffect, useState } from "react";
import { AdminCard, firebase } from "@/main";
import { Table, Card } from "antd";
import moment from "moment";
import AdminProductAdd from "./admin_product_add/admin_product_add";
import ProductDelete from "./admin_product_delete";
import ProductUpdate from "./admin_product_update/admin_product_update";
import ProductShow from "./admin_product_show";
import ProductStatus from "./admin_product_status";
export default function AdminProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase.db.collection("Product").onSnapshot((querySnapshot) => {
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
      title: "Төлөв",
      dataIndex: ["isAvailable", "key"],
      key: "isAvailable",
      // render: (a) => (a ? "Байгаа" : "Байхгүй"),
      render: (a, q) => {
        return <ProductStatus checked={q} />;
      },
    },
    {
      title: "Нүүрэнд харагдах",
      dataIndex: ["isFeatured", "key"],
      key: "isFeatured",
      // render: (a) => (a ? "Тийм" : "Үгүй"),
      render: (a, q) => <ProductShow checked={q} />,
    },
    {
      title: "Засах / Харах",
      render: (a) => {
        return <ProductUpdate defaultData={a} loader={setLoading} />;
      },
    },
    {
      title: "Устгах",
      dataIndex: "key",
      key: "key",
      render: (a) => {
        return <ProductDelete id={a} loader={setLoading} />;
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
    <AdminCard title="Бараа" loading="">
      <Card extra={<AdminProductAdd loader={setLoading} />}>
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
