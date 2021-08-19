import { Form, Input, Button, Card, Spin, message } from "antd";
import { firebase } from "@/main";

const Login = () => {
  const onFinish = (values) => {
    firebase.auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        if (!firebase.auth.currentUser) {
          return <Spin />;
        }
        window.location.hash = "/admin";
      })
      .catch((error) => {
        var errorMessage = error.message;
        message.error(errorMessage);
      });
  };

  return (
    <Card style={{ width: 500, margin: "auto", marginTop: "10%" }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Нэвтрэх нэр"
          name="email"
          rules={[
            {
              required: true,
              message: "Нэвтрэх нэрээ оруулна уу!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Нууц үг"
          name="password"
          rules={[
            {
              required: true,
              message: "Нууц үгээ оруулна уу!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Нэвтрэх
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Login;
