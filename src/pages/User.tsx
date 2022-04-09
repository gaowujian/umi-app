import { Button, Form, Input } from "antd";
import React, { useMemo } from "react";
import { Link } from "umi";

type Props = {};

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailItemLayout = {
  wrapperCol: {
    offset: 4,
    span: 14,
  },
};
function User({}: Props) {
  return (
    <div>
      <Form
        {...formItemLayout}
        onFinish={(values) => {
          console.log("values:", values);
        }}
      >
        <Form.Item label="name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="age" name="age">
          <Input />
        </Form.Item>
        <Form.Item {...tailItemLayout}>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default User;
