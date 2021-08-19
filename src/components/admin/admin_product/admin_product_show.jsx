import { Switch, message } from "antd";
import { firebase } from "@/main";
export default function AdminProductAvailable({ checked }) {
  function onChange(status) {
    console.log(status);
    firebase.db
      .collection("Product")
      .doc(checked.key)
      .update({
        isFeatured: status,
      })
      .then(function () {
        message.success("Амжилттай солигдлоо");
      })
      .catch(function (error) {
        alert(error);
      });
  }
  return <Switch defaultChecked={checked.isFeatured} onChange={onChange} />;
}
