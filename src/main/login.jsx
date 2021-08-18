import { Form, Input, Button, Card } from "antd";
import { firebase } from "@/main";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    firebase.auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((user) => {
        console.log(user);
        window.location.hash = "/admin";
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Нэвтрэх нэр"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
              message: "Please input your password!",
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
