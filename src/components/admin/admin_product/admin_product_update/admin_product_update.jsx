import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import ReactQuill from "react-quill";
import { firebase, ImageUpload } from "@/main";
import "react-quill/dist/quill.snow.css";
import Category from "./update_category";
import SubCategory from "./update_sub_category";
import Brand from "./update_brand";
import Available from "./update_isAvailable";
import Featured from "./update_isFeatured";
const CollectionCreateForm = ({ visible, onCreate, onCancel, defaultData }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState(defaultData.description);
  const [description2, setDescription2] = useState(defaultData.descriptionEn);
  const [image_url, set_url] = useState(defaultData);
  const [category, set_category] = useState([]);
  const [sub_category, set_sub_category] = useState([]);
  const [brand, set_brand] = useState([]);
  const [available, set_available] = useState(true);
  const [featured, set_featured] = useState(true);
  useEffect(() => {
    form.resetFields();
  }, [defaultData]);

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
        <Form.Item label="Зураг оруулах">
          <ImageUpload
            image_URL={(q) => {
              set_url(q);
            }}
          />
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
        <Category
          defaultData={defaultData.category}
          category={(q) => {
            set_category(q);
          }}
        />
        <SubCategory
          defaultData={defaultData.sub_category}
          sub_category={(q) => {
            set_sub_category(q);
          }}
        />
        <Brand
          defaultData={defaultData.brand}
          brand={(q) => {
            set_brand(q);
          }}
        />
        <Available
          defaultData={defaultData.isAvailable}
          isAvailable={(q) => {
            set_available(q);
          }}
        />
        <Featured
          defaultData={defaultData.isFeatured}
          isFeatured={(q) => {
            set_featured(q);
          }}
        />
      </Form>
    </Modal>
  );
};

const ProductUpdate = ({ loader, defaultData }) => {
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
      .doc(defaultData.key)
      .update({
        name: values.name ? values.name : defaultData.name,
        nameEn: values.nameEn ? values.nameEn : defaultData.nameEn,
        description: description ? description : "",
        descriptionEn: description2 ? description : "",
        isAvailable: available ? available : "",
        isFeatured: featured ? featured : "",
        category: category ? category : "",
        sub_category: sub_category ? sub_category : "",
        brand: brand ? brand : "",
        image: image_url ? image_url : defaultData.image,
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
