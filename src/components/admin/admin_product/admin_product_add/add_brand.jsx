import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { firebase } from "@/main";
export default function Category(props) {
  const { Option } = Select;
  const [brand, set_brand] = useState([]);

  useEffect(() => {
    firebase.db.collection("Brand").onSnapshot((querySnapshot) => {
      const brand = [];
      querySnapshot.forEach((documentSnapshot) => {
        brand.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      set_brand(brand);
    });
  }, []);
  return (
    <Form.Item label="Брэнд">
      <Select
        onChange={(a) => {
          props.brand(a);
        }}
      >
        {brand.map((q) => {
          return (
            <Option key={q.key} value={q.key}>
              {q.nameEn}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
}
