import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import ReactQuill from "react-quill";
import { firebase } from "@/main";
import "react-quill/dist/quill.snow.css";
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
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
      </Form>
    </Modal>
  );
};

const AdminSubCategoryAdd = ({ loader }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values, description, description2) => {
    firebase.db
      .collection("SubCategory")
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
export default AdminSubCategoryAdd;
