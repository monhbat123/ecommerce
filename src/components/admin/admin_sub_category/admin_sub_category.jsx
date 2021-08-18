import { useEffect, useState } from "react";
import { AdminCard, firebase } from "@/main";
import { Table, Card } from "antd";
import moment from "moment";
import AdminSubCategoryAdd from "./admin_sub_category_add";
import AdminSubCategoryUpdate from "./admin_sub_category_update";
import AdminSubCategoryDelete from "./admin_sub_category_delete";
export default function AdminSubCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase.db.collection("SubCategory").onSnapshot((querySnapshot) => {
      const sub_category = [];
      querySnapshot.forEach((documentSnapshot) => {
        sub_category.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setData(sub_category);
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
        return <AdminSubCategoryUpdate defaultData={a} loader={setLoading} />;
      },
    },
    {
      title: "Устгах",
      dataIndex: "key",
      key: "key",
      render: (a) => {
        return <AdminSubCategoryDelete id={a} loader={setLoading} />;
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
    <AdminCard title="Жижиг төрөл">
      <Card extra={<AdminSubCategoryAdd loader={setLoading} />}>
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
