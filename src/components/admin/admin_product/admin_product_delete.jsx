import { Popconfirm, message } from "antd";
import { firebase } from "@/main";
export default function AdminSubCategoryDelete({ id, loader }) {
  function confirm() {
    firebase.db
      .collection("Product")
      .doc(id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.ref.delete();
        message.success("Бараа амжилттай устгагдлаа");
        loader(true);
      });
  }
  /* eslint-disable */

  return (
    <Popconfirm
      title="Та энэ төрлийг устгахдаа итгэлтэй байна уу?"
      onConfirm={confirm}
      okText="Тийм"
      cancelText="Үгүй"
    >
      <a href="javascript:void(0)">Устгах</a>
    </Popconfirm>
  );
}
