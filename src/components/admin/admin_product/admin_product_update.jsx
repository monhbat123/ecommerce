import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Select } from "antd";
import ReactQuill from "react-quill";
import { firebase, ImageUpload } from "@/main";
import "react-quill/dist/quill.snow.css";
const CollectionCreateForm = ({ visible, onCreate, onCancel, defaultData }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [description, setDescription] = useState([defaultData.description]);
  const [description2, setDescription2] = useState([defaultData.descriptionEn]);
  const [category, set_category] = useState([]);
  const [sub_category, set_sub_category] = useState([]);
  const [brand, set_brand] = useState([]);
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

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
  }, [visible]);
  return (
    <Modal
      visible={visible}
      title="Шинэ төрөл үүсгэх"
      okText="Үүсгэх"
      cancelText="Болих"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values, description, description2);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item label="Төрөл">
          <Select
            defaultValue={defaultData.categoryName}
            onChange={handleChange}
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
        <Form.Item label="Жижиг төрөл">
          <Select
            onChange={handleChange}
            defaultValue={defaultData.subCategoryName}
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
        <Form.Item label="Брэнд">
          <Select onChange={handleChange} defaultValue={defaultData.brandName}>
            {brand.map((q) => {
              return (
                <Option key={q.key} value={q.key}>
                  {q.nameEn}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="name" label="Нэр">
          <Input defaultValue={defaultData.name} />
        </Form.Item>
        <Form.Item name="nameEn" label="Нэр (English)">
          <Input defaultValue={defaultData.nameEn} />
        </Form.Item>
        <Form.Item label="Тайлбар">
          <ReactQuill
            theme="snow"
            value={description[0]}
            onChange={(a) => {
              setDescription([a]);
            }}
          />
        </Form.Item>
        <Form.Item label="Тайлбар (English)">
          <ReactQuill
            theme="snow"
            value={description2[0]}
            onChange={(w) => {
              setDescription2([w]);
            }}
          />
        </Form.Item>
        <Form.Item label="Зураг оруулах">{/* <ImageUpload /> */}</Form.Item>
      </Form>
    </Modal>
  );
};

const ProductUpdate = ({ loader, defaultData }) => {
  const [visible, setVisible] = useState(false);
  console.log(defaultData);
  const onCreate = (values, description, description2) => {
    firebase.db
      .collection("Product")
      .doc()
      .set({
        name: values.name,
        nameEn: values.nameEn,
        description: description,
        descriptionEn: description2,
      })
      .then(function () {
        message.success("Амжилттай нэмэгдлээ");
        setVisible(false);
        loader(true);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <div>
      <a
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Засах / Харах
      </a>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        defaultData={defaultData}
      />
    </div>
  );
};
export default ProductUpdate;