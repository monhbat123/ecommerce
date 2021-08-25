import { useState, useEffect } from "react";
import { AdminCard, firebase } from "@/main";
import AdminContactUpdate from "./admin_contact_update";
export default function AdminContact() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase.db.collection("Contact").onSnapshot((querySnapshot) => {
      const contact = [];
      querySnapshot.forEach((documentSnapshot) => {
        contact.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setLoading(false);
      setData(contact[0]);
    });
  }, [loading]);
  return (
    <AdminCard title="Холбоо барих хэсэг" loading={loading}>
      Холбоо барих хэсэг
      <AdminContactUpdate defaultValue={data} loading={setLoading} />
      <div>Хаяг 1 : {data.address}</div>
      <div>Хаяг 2 : {data.address2}</div>
      <div>Email 1 : {data.email}</div>
      <div>Email 2 : {data.email2}</div>
      <div>
        Facebook : <a href={data.facebook}>{data.facebook}</a>
      </div>
      <div>
        Instagram: <a href={data.instagram}>{data.instagram}</a>
      </div>
      <div>
        LinkedIn: <a href={data.linkedin}>{data.linkedin}</a>
      </div>
      <div>
        Youtube: <a href={data.youtube}>{data.youtube}</a>
      </div>
      <div>Phone Prefix : {data.phone_prefix}</div>
      <div>Phone 1 : {data.phone}</div>
      <div>Phone 2 : {data.phone2}</div>
      <div>Phone 3 : {data.phone3}</div>
    </AdminCard>
  );
}
