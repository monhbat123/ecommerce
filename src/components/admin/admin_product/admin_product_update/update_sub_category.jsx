import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { firebase } from "@/main";
export default function Category(props) {
  const { Option } = Select;
  const [sub_category, set_sub_category] = useState([]);

  useEffect(() => {
    firebase.db.collection("SubCategory").onSnapshot((querySnapshot) => {
      const sub_category = [];
      querySnapshot.forEach((documentSnapshot) => {
        sub_category.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      set_sub_category(sub_category);
    });
  }, []);
  return (
    <Form.Item label="Жижиг төрөл">
      <Select
        onChange={(a) => {
          props.sub_category(a);
        }}
        defaultValue={props.defaultData}
      >
        {sub_category.map((q) => {
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
