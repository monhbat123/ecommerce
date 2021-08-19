import { Form, Select } from "antd";

export default function Available(props) {
  const { Option } = Select;

  return (
    <Form.Item label="Харуулах">
      <Select
        onChange={(d) => {
          props.isFeatured(d);
        }}
      >
        <Option value={true}>Тийм</Option>
        <Option value={false}>Үгүй</Option>
      </Select>
    </Form.Item>
  );
}
