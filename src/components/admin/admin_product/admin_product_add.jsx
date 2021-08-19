import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Select } from "antd";
import ReactQuill from "react-quill";
import { firebase, ImageUpload } from "@/main";
import "react-quill/dist/quill.snow.css";
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [category, set_category] = useState([]);
  const [sub_category, set_sub_category] = useState([]);
  const [brand, set_brand] = useState([]);
  const [status, setStatus] = useState(true);
  const [show, setShow] = useState(false);
  const [sel_category, set_sel_cat] = useState([]);
  const [sel_sub_category, set_sel_sub_cat] = useState([]);
  const [sel_brand, set_sel_brand] = useState([]);
  const [image_url, set_url] = useState([]);

  function handleChange(value) {
    set_sel_cat(value);
  }
  function handleChange2(value) {
    set_sel_sub_cat(value);
  }
  function handleChange3(value) {
    set_sel_brand(value);
  }
  function handleChange4(value) {
    setStatus(value);
  }
  function handleChange5(value) {
    setShow(value);
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
            onCreate(
              values,
              description,
              description2,
              sel_category,
              sel_sub_category,
              sel_brand,
              status,
              show,
              image_url
            );
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
          <Select onChange={handleChange}>
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
          <Select onChange={handleChange2}>
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
          <Select onChange={handleChange3}>
            {brand.map((q) => {
              return (
                <Option key={q.key} value={q.key}>
                  {q.nameEn}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Төлөв">
          <Select onChange={handleChange4} defaultValue={status}>
            <Option value={true}>Байгаа</Option>
            <Option value={false}>Байхгүй</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Нүүрэнд харуулах">
          <Select onChange={handleChange5} defaultValue={show}>
            <Option value={true}>Тийм</Option>
            <Option value={false}>Үгүй</Option>
          </Select>
        </Form.Item>
        <Form.Item name="name" label="Нэр">
          <Input />
        </Form.Item>
        <Form.Item name="nameEn" label="Нэр (English)">
          <Input />
        </Form.Item>
        <Form.Item label="Тайлбар">
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </Form.Item>
        <Form.Item label="Тайлбар (English)">
          <ReactQuill
            theme="snow"
            value={description2}
            onChange={setDescription2}
          />
        </Form.Item>
        <Form.Item label="Зураг оруулах">
          <ImageUpload
            image_URL={(q) => {
              set_url(q);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ProductAdd = ({ loader }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (
    values,
    description,
    description2,
    status,
    show,
    sel_category,
    sel_sub_category,
    sel_brand,
    image_url
  ) => {
    firebase.db
      .collection("Product")
      .doc()
      .set({
        name: values.name,
        nameEn: values.nameEn,
        description: description,
        descriptionEn: description2,
        isAvailable: status,
        isFeatured: show,
        category: sel_category,
        sub_category: sel_sub_category,
        brand: sel_brand,
        image: image_url,
      })
      .then(function () {
        message.success("Бараа амжилттай нэмэгдлээ");
        setVisible(false);
        loader(true);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Нэмэх
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
export default ProductAdd;
