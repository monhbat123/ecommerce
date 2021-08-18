import { Button } from "antd";
import { firebase } from "@/main";
export default function AdminHeader() {
  function logOut() {
    firebase.auth
      .signOut()
      .then(() => {
        console.log("loged out");
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <div className="admin_header_container">
      <Button
        className="admin_logout_button"
        onClick={() => {
          logOut();
        }}
      >
        Гарах
      </Button>
    </div>
  );
}
