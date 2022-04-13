import { Form, Input, Button, Space, Select, Row, Col, Checkbox } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import PriceInput from "./components/PriceInput";

const { Option } = Select;
const { useForm } = Form;
function CommonForm() {
  const [form] = useForm();
  return (
    <>
      <h1>普通表单</h1>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        labelAlign="left"
        colon={false}
        labelWrap
        onFinish={(values) => {
          console.log("values:", values);
        }}
        initialValues={{ name: null, password: null, address: null, price: 0, captcha: null, params: null, sleep: false, names: [] }}
      >
        <Form.Item name={"name"} label="name">
          <Input style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item dependencies={["name"]} noStyle>
          {({ getFieldValue }) => {
            const fullName = getFieldValue("name") + "(tony)";
            // return fullName + "这一项无法绑定到form的store中";
            return (
              <Form.Item name={"fullName"} label={fullName}>
                <Input style={{ width: "70%" }} />
              </Form.Item>
            );
          }}
        </Form.Item>
        <Form.Item name={"password"} label="passwordpasswordpasswordpassword">
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            (props) => {
              const { getFieldValue } = props;
              return {
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The two passwords that you entered do not match!"));
                },
              };
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.List
          name={"names"}
          // rules={[
          //   {
          //     validator: async (_, names) => {
          //       if (!names || names.length < 2) {
          //         return Promise.reject(new Error("At least 2 passengers"));
          //       }
          //     },
          //   },
          // ]}
        >
          {(fields, operation, meta) => {
            return (
              <>
                {fields.map((field, index) => {
                  // 外层item负责布局,左右侧宽度尺寸,  添加key, 包括添加一个修饰符，例如这里需要添加一个删除符号
                  // 内层item负责绑定name，rules校验规则,并添加no style表示不需要使用布局
                  console.log("field:", field);
                  return (
                    <Form.Item label={index === 0 ? "Passengers" : " "} key={index}>
                      <Form.Item name={field.name} noStyle>
                        <Input placeholder="passenger name" style={{ width: "80%" }} />
                      </Form.Item>
                      {fields.length > 1 ? <MinusCircleOutlined className="dynamic-delete-button" onClick={() => operation.remove(field.name)} /> : null}
                    </Form.Item>
                  );
                })}
                <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
                  <Button type="dashed" onClick={() => operation.add()}>
                    添加表单项
                  </Button>
                  <Button
                    type="dashed"
                    onClick={() => {
                      operation.add("第一个项目", 0);
                    }}
                  >
                    从头部插入表单项
                  </Button>
                  <Form.ErrorList errors={meta.errors} />
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.List name={"params"}>
          {(fields, { remove, add }, meta) => {
            return (
              <>
                {fields.map(({ name, key, ...restField }) => {
                  // 外层item负责布局,左右侧宽度尺寸,  添加key, 包括添加一个修饰符，例如这里需要添加一个删除符号
                  // 内层item负责绑定name，rules校验规则,并添加no style表示不需要使用布局
                  console.log("name:", name);
                  // debugger;
                  return (
                    <Form.Item
                      wrapperCol={{ span: 20, offset: 4 }}
                      key={key}
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                        <Form.Item {...restField} name={[name, "first"]}>
                          <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, "last"]}>
                          <Input placeholder="Last Name" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    </Form.Item>
                  );
                })}
                <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
                  <Button type="dashed" onClick={() => add()}>
                    添加表单项
                  </Button>
                  <Form.ErrorList errors={meta.errors} />
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item label="Address">
          {/* <Input.Group compact> */}
          <Form.Item name={["address", "province"]} noStyle>
            <Select placeholder="Select province" style={{ width: "50%" }}>
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>
          </Form.Item>
          <Form.Item name={["address", "street"]} noStyle>
            <Input style={{ width: "50%" }} placeholder="Input street" />
          </Form.Item>
          {/* </Input.Group> */}
        </Form.Item>
        <Form.Item name="price" label="Price">
          <PriceInput />
        </Form.Item>
        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="captcha" noStyle>
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Button>Get captcha111</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="是否需要睡觉" name="sleep" valuePropName="checked">
          <Checkbox />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CommonForm;
