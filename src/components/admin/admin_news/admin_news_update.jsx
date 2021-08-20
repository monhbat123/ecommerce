import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import ReactQuill from "react-quill";
import { firebase, ImageUpload } from "@/main";
import "react-quill/dist/quill.snow.css";
const CollectionCreateForm = ({ visible, onCreate, onCancel, defaultData }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState(defaultData.post);
  const [description2, setDescription2] = useState(defaultData.postEn);
  const [image_url, set_url] = useState([]);
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
        <Form.Item name="title" label="Гарчиг">
          <Input defaultValue={defaultData.title} />
        </Form.Item>
        <Form.Item label="Нийтлэл">
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </Form.Item>
        <Form.Item name="titleEn" label="Гарчиг (English)">
          <Input defaultValue={defaultData.titleEn} />
        </Form.Item>
        <Form.Item label="Нийтлэл (English)">
          <ReactQuill
            theme="snow"
            value={description2}
            onChange={setDescription2}
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

const NewsUpdate = ({ loader, defaultData }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values, description, description2, image_url) => {
    firebase.db
      .collection("News")
      .doc(defaultData.key)
      .update({
        title: values.title ? values.title : defaultData.title,
        titleEn: values.titleEn ? values.titleEn : defaultData.titleEn,
        post: description ? description : "",
        postEn: description2 ? description2 : "",
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
  };

  return (
    <div>
      <a
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
export default NewsUpdate;
