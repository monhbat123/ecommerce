import { Switch, message } from "antd";
import { firebase } from "@/main";
export default function AdminProductStatus({ checked }) {
  function onChange(status) {
    console.log(status);
    firebase.db
      .collection("Product")
      .doc(checked.key)
      .update({
        isAvailable: status,
      })
      .then(function () {
        message.success("Төлөв амжилттай солигдлоо");
      })
      .catch(function (error) {
        alert(error);
      });
  }
  return <Switch defaultChecked={checked.isAvailable} onChange={onChange} />;
}
