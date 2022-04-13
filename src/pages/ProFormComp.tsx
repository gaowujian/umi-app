import ProForm, { ProFormText, ProFormDependency, ProFormList, ProFormSelect, ProFormCaptcha } from "@ant-design/pro-form";
import { MailTwoTone } from "@ant-design/icons";
interface IFormData {
  name: string;
  age: string;
  password: string;
  address: string;
  price: number;
  captcha: number | null;
  params: Record<string, any>;
  sleep: boolean;
  names: string[];
}
const initialValues: IFormData = {
  name: "gaowujian",
  age: "28",
  password: "",
  address: "",
  price: 0,
  captcha: null,
  params: {},
  sleep: false,
  names: [],
};

function ProFomComp() {
  const handleSubmit = async (values: IFormData) => {
    console.log("values:", values);
  };
  return (
    <div>
      <h1>高级表单</h1>
      <ProForm<IFormData>
        title="高级表单"
        onFinish={handleSubmit}
        initialValues={initialValues}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        grid={true}
        labelAlign="left"
      >
        {/* <ProFormText name="name" label="标题" tooltip="最长为 24 位" placeholder="请输入名称" />
        <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="姓名" />
        <ProFormDigit colProps={{ md: 12, xl: 8 }} name="phone" label="电话" />
        <ProFormText colProps={{ md: 12, xl: 8 }} name="email" label="邮箱" /> */}

        <ProFormText name={"name"} label="姓名" colProps={{ span: 24 }} fieldProps={{ style: { width: "50%" } }} />
        <ProFormText name={"age"} label="年龄" colProps={{ span: 12 }} />
        <ProFormText name={"phone"} label="电话" colProps={{ span: 12 }} />

        <ProFormDependency name={["name", "age", "phone"]}>
          {({ name, age, phone }) => {
            return <div style={{ marginLeft: "4px" }}>{`姓名:${name} 年龄:${age} 电话:${phone}`}</div>;
          }}
        </ProFormDependency>

        <ProFormText.Password label="password" name="password" />
        <ProFormDependency name={["password"]}>
          {() => {
            return (
              <ProFormText.Password
                name="confirm"
                label="Confirm Password"
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
              />
            );
          }}
        </ProFormDependency>
        <ProFormList
          name="users"
          initialValue={[
            {
              useMode: "chapter",
            },
          ]}
          creatorButtonProps={{
            position: "top",
            creatorButtonText: "新建一行",
          }}
          creatorRecord={{
            useMode: "none",
          }}
          label="用户列表"
          min={2}
          max={5}
          // itemContainerRender={(doms) => {
          //   console.log("doms:", doms);
          //   return (
          //     <ProForm.Group title="title" label="label" tooltip="tip">
          //       {doms}
          //     </ProForm.Group>
          //   );
          // }}
        >
          {(f, index, action) => {
            console.log(f, index, action);
            return (
              <ProForm.Group>
                <ProFormText initialValue={index} name="rowKey" label={`第 ${index} 配置`} colProps={{ span: 8 }} />
                <ProFormText name="name" label="姓名" colProps={{ span: 8 }} />
                <ProFormDependency name={["name"]}>
                  {({ name }) => {
                    if (!name) {
                      return (
                        <span
                          style={{
                            lineHeight: "32px",
                          }}
                        >
                          输入姓名展示
                        </span>
                      );
                    }
                    return <ProFormText name="remark" label="昵称详情" colProps={{ span: 8 }} />;
                  }}
                </ProFormDependency>
                <ProFormSelect
                  name="addr"
                  width="md"
                  label="与 name 联动的选择器"
                  dependencies={["name"]}
                  request={async (params) => [
                    { label: params.name, value: "all" },
                    { label: "Unresolved", value: "open" },
                    { label: "Resolved", value: "closed" },
                    { label: "Resolving", value: "processing" },
                  ]}
                  colProps={{ span: 20 }}
                />
              </ProForm.Group>
            );
          }}
        </ProFormList>
        <ProFormCaptcha
          label="验证码"
          fieldProps={{
            // size: "large",
            prefix: <MailTwoTone />,
          }}
          captchaProps={
            {
              // size: "large",
            }
          }
          // 手机号的 name，onGetCaptcha 会注入这个值
          phoneName="phone"
          name="captcha"
          rules={[
            {
              required: true,
              message: "请输入验证码",
            },
          ]}
          countDown={60}
          placeholder="请输入验证码"
          // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
          // throw new Error("获取验证码错误")
          onGetCaptcha={async (phone) => {
            console.log("phone:", phone);
            // await waitTime(1000);
            // message.success(`手机号 ${phone} 验证码发送成功!`);
          }}
        />
      </ProForm>
      <ol>
        <strong>开发感受不同</strong>
        <li>自带提交和重置按钮</li>
        <li>需要手动开始grid支持栅格化布局</li>
        <li>默认labelAlign是右对齐</li>
        <li>ProFormDependency依赖的name属性和 Form.Item依赖的depenencies属性相同</li>
        <li>proform.list支持renderprops和一个itemRender,我认为绝大部分情况下只用 render children props的方式足以实现自定义列表项</li>
        <li>proform 和form一样支持配置 label和content的宽度大小，</li>
        <li>在配置了grid之后，可以对content中的每个元素去进行栅格化布局，因为默认的都是自成一行，protext自己可以想一个col元素一样设置span大小</li>
        <li>使用了col之后会进行自动的换行操作，如果只是使用style去修改宽度，容器的宽度依然是百分比，只是表单元素的宽度变小</li>
        <li>使用col进行栅格化布局之后，在自己的宽度范围内，在进行label和wrapper区域的划分</li>
        <li>可以认为 proformtext等组件 是formitem + input等组件的集合</li>
        <li>而 ProFormDependency 是 没有style的formitem + renderprop的集合 </li>
      </ol>
    </div>
  );
}

export default ProFomComp;
