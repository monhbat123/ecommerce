import { useEffect, useState } from "react";
import { AdminCard, firebase } from "@/main";
import { Table, Card } from "antd";
import moment from "moment";
import AdminCategoryAdd from "./admin_category_add";
import AdminCategoryUpdate from "./admin_category_update";
import AdminCategoryDelete from "./admin_category_delete";
export default function AdminCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase.db.collection("Category").onSnapshot((querySnapshot) => {
      const category = [];
      querySnapshot.forEach((documentSnapshot) => {
        category.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setData(category);
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
        return <AdminCategoryUpdate defaultData={a} loader={setLoading} />;
      },
    },
    {
      title: "Устгах",
      dataIndex: "key",
      key: "key",
      render: (a) => {
        return <AdminCategoryDelete id={a} loader={setLoading} />;
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
    <AdminCard title="Төрөл">
      <Card extra={<AdminCategoryAdd loader={setLoading} />}>
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
