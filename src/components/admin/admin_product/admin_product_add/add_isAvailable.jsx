import { Form, Select } from "antd";

export default function Available(props) {
  const { Option } = Select;

  return (
    <Form.Item label="Төлөв">
      <Select
        onChange={(d) => {
          props.isAvailable(d);
        }}
      >
        <Option value={true}>Байгаа</Option>
        <Option value={false}>Байхгүй</Option>
      </Select>
    </Form.Item>
  );
}
