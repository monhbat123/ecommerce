import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { firebase } from "@/main";

import "react-quill/dist/quill.snow.css";
const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  defaultValue,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [defaultValue, form, onCreate]);
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
            onCreate(values);
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
        <Form.Item name="address" label="Address 2">
          <Input.TextArea defaultValue={defaultValue.email} />
        </Form.Item>
        <Form.Item name="address2" label="Address 2">
          <Input.TextArea defaultValue={defaultValue.email} />
        </Form.Item>
        <Form.Item name="email" label="Email 1">
          <Input defaultValue={defaultValue.email} />
        </Form.Item>
        <Form.Item name="email2" label="Email 2">
          <Input defaultValue={defaultValue.email2} />
        </Form.Item>
        <Form.Item name="facebook" label="facebook">
          <Input defaultValue={defaultValue.facebook} />
        </Form.Item>
        <Form.Item name="instagram" label="instagram">
          <Input defaultValue={defaultValue.instagram} />
        </Form.Item>
        <Form.Item name="linkedin" label="linkedin">
          <Input defaultValue={defaultValue.linkedin} />
        </Form.Item>
        <Form.Item name="youtube" label="youtube">
          <Input defaultValue={defaultValue.youtube} />
        </Form.Item>
        <Form.Item name="phone_prefix" label="phone_prefix">
          <Input defaultValue={defaultValue.phone_prefix} />
        </Form.Item>
        <Form.Item name="phone" label="phone">
          <Input defaultValue={defaultValue.phone} />
        </Form.Item>
        <Form.Item name="phone2" label="phone2">
          <Input defaultValue={defaultValue.phone2} />
        </Form.Item>
        <Form.Item name="phone3" label="phone3">
          <Input defaultValue={defaultValue.phone3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AdminContactUpdate = ({ loading, defaultValue }) => {
  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    firebase.db
      .collection("Contact")
      .doc(defaultValue.key)
      .update({
        address: values.address ? values.address : defaultValue.address,
        address2: values.address2 ? values.address2 : defaultValue.address2,
        email: values.email ? values.email : defaultValue.email,
        email2: values.email2 ? values.email2 : defaultValue.email2,
        facebook: values.facebook ? values.facebook : defaultValue.facebook,
        instagram: values.instagram ? values.instagram : defaultValue.instagram,
        linkedin: values.linkedin ? values.linkedin : defaultValue.linkedin,
        youtube: values.youtube ? values.youtube : defaultValue.youtube,
        phone_prefix: values.phone_prefix
          ? values.phone_prefix
          : defaultValue.phone_prefix,
        phone: values.phone ? values.phone : defaultValue.phone,
        phone2: values.phone2 ? values.phone2 : defaultValue.phone2,
        phone3: values.phone3 ? values.phone3 : defaultValue.phone3,
      })
      .then(function () {
        message.success("Амжилттай засагдлаа");
        setVisible(false);
        loading(true);
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
        defaultValue={defaultValue}
      />
    </div>
  );
};
export default AdminContactUpdate;
