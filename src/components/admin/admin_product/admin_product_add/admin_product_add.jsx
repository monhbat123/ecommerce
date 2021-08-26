import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import ReactQuill from "react-quill";
import { firebase, ImageUpload } from "@/main";
import "react-quill/dist/quill.snow.css";
import Category from "./add_category";
import SubCategory from "./add_sub_category";
import Brand from "./add_brand";
import Available from "./add_isAvailable";
import Featured from "./add_isFeatured";
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [image_url, set_url] = useState([]);
  const [category, set_category] = useState([]);
  const [sub_category, set_sub_category] = useState([]);
  const [brand, set_brand] = useState([]);
  const [available, set_available] = useState(true);
  const [featured, set_featured] = useState(true);
  /* eslint-disable */

  return (
    <Modal
      visible={visible}
      title="Бараа нэмэх"
      okText="Нэмэх"
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
              image_url,
              category,
              sub_category,
              brand,
              available,
              featured
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
        <Category
          category={(q) => {
            set_category(q);
          }}
        />
        <SubCategory
          sub_category={(q) => {
            set_sub_category(q);
          }}
        />
        <Brand
          brand={(q) => {
            set_brand(q);
          }}
        />
        <Available
          isAvailable={(q) => {
            set_available(q);
          }}
        />
        <Featured
          isFeatured={(q) => {
            set_featured(q);
          }}
        />
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
    image_url,
    category,
    sub_category,
    brand,
    available,
    featured
  ) => {
    firebase.db
      .collection("Product")
      .doc()
      .set({
        name: values.name,
        nameEn: values.nameEn,
        description: description,
        descriptionEn: description2,
        isAvailable: available,
        isFeatured: featured,
        category: category,
        sub_category: sub_category,
        brand: brand,
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
