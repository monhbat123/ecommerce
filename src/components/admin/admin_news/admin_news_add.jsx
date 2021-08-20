import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import ReactQuill from "react-quill";
import { firebase, ImageUpload } from "@/main";
import "react-quill/dist/quill.snow.css";
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
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
          <Input />
        </Form.Item>
        <Form.Item label="Нийтлэл">
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </Form.Item>
        <Form.Item name="titleEn" label="Гарчиг (English)">
          <Input />
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
            image_URL={(q) => {
              set_url(q);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const NewsAdd = ({ loader }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values, description, description2, image_url) => {
    firebase.db
      .collection("News")
      .doc()
      .set({
        title: values.title,
        titleEn: values.titleEn,
        post: description,
        postEn: description2,
        image: image_url,
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
export default NewsAdd;
