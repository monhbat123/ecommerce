import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { firebase, ImageUpload } from "@/main";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CollectionCreateForm = ({ visible, onCreate, onCancel, defaultData }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState([defaultData.description]);
  const [description2, setDescription2] = useState([defaultData.descriptionEn]);
  const [image_url, set_url] = useState([]);
  useEffect(() => {
    form.resetFields();
  }, [defaultData, form, onCreate]);
  return (
    <Modal
      visible={visible}
      title="Төрөл засах"
      okText="Засах"
      cancelText="Болих"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values, description, description2, image_url);
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
        <Form.Item label="Зураг оруулах">
          <ImageUpload
            defaultImage={defaultData.image}
            image_URL={(q) => {
              set_url(q);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AdminBrandUpdate = ({ defaultData, loader }) => {
  const [visible, setVisible] = useState(false);
  const onCreate = (values, description, description2, image_url) => {
    firebase.db
      .collection("Brand")
      .doc(defaultData.key)
      .update({
        name: values.name ? values.name : defaultData.name,
        nameEn: values.nameEn ? values.nameEn : defaultData.nameEn,
        description: description[0],
        descriptionEn: description2[0],
        image: image_url ? image_url : defaultData.image,
      })
      .then(function () {
        message.success("Амжилттай засагдлаа");
        setVisible(false);
        loader(true);
      })
      .catch(function (error) {
        alert(error);
      });

    setVisible(false);
  };

  return (
    <div>
      <a
        type="primary"
        href="javascript:void(0)"
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
export default AdminBrandUpdate;
