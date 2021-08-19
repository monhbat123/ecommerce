import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { firebase } from "@/main";
export default function Category(props) {
  const { Option } = Select;
  const [category, set_category] = useState([]);

  useEffect(() => {
    firebase.db.collection("Category").onSnapshot((querySnapshot) => {
      const category = [];
      querySnapshot.forEach((documentSnapshot) => {
        category.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      set_category(category);
    });
  }, []);
  return (
    <Form.Item label="Төрөл">
      <Select
        onChange={(a) => {
          props.category(a);
        }}
        defaultValue={props.defaultData}
      >
        {category.map((q) => {
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
