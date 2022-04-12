import { Row, Form, Col, Button } from "antd";
import ProForm, { ProFormDependency, ProFormText, ProFormSelect } from "@ant-design/pro-form";
import { EditableProTable } from "@ant-design/pro-table";
import DoubleSelect from "./components/DoubleSelect";

const features = [
  {
    id: 1,
    featureName: "deepRestore",
    params: {
      propAAA: false,
      propB: false,
    },
  },

  {
    id: 2,
    featureName: "fastUpres",
    params: {
      scale: 2,
    },
  },
];
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

const tailItemLayout = {
  wrapperCol: {
    offset: 10,
    span: 14,
  },
};

interface IFormData {
  workflowName: string;
  featureId: number;
  [param: string]: any;
}

const columns = [
  {
    title: "序号",
    render: function (text, record, index) {
      return index + 1;
    },
    key: "index",
  },
  {
    title: "模块名",
    dataIndex: "featureName",
    key: "featureName",
  },
  {
    title: "操作",
    render: function (text, record, index) {
      return <Button danger>删除</Button>;
    },
    key: "operation",
  },
];

function WorkflowCard() {
  const [form] = Form.useForm<IFormData>();

  // const [dataSource, setDataSource] = useState<{ featureName: string; params: any; id: number }[]>([]);
  const addToTable = () => {
    const { workflowName, featureId, dataSource, ...rest } = form.getFieldsValue();
    console.log(" form.getFieldsValue():", form.getFieldsValue());
    form.setFieldsValue({
      dataSource: [
        ...dataSource,
        {
          featureName: features.find((f) => f.id === featureId)?.featureName,
          params: rest,
          id: Math.random() * 10,
        },
      ],
    });
    console.log(" form.getFieldsValue():", form.getFieldsValue());
    // dataSource.push({
    //   params: rest,
    //   featureName: features.find((f) => f.id === featureId)?.featureName,
    // });
    // console.log(" form.getFieldsValue():", form.getFieldsValue());
    // console.log("form.getFieldsValue():", form.getFieldsValue());
    // console.log("dataSource:", dataSource);
    // setDataSource([
    //   ...dataSource,
    //   {
    //     featureName: features.find((f) => f.id === featureId)?.featureName,
    //     params: rest,
    //     id: Math.random() * 10,
    //   },
    // ]);
  };

  return (
    <div>
      <ProForm<IFormData>
        form={form}
        initialValues={{
          featureId: 1,
          workflowName: "",
          dataSource: [],
        }}
        layout="horizontal"
        grid={true}
        {...formItemLayout}
        submitter={false}
      >
        <Row>
          <Col span={12}>
            <ProFormText label="工作流名字" name={"workflowName"} />

            <Form.Item name="featureId">
              <DoubleSelect />
            </Form.Item>
            <ProFormSelect
              label="选择的模块"
              name={"featureId"}
              options={features.map((feature) => ({ label: feature.featureName, value: feature.id }))}
              allowClear={false}
            />
            <ProFormDependency name={["featureId"]}>
              {(dependencyValues) => {
                const { featureId } = dependencyValues;
                const feature = features.find((f) => f.id === featureId);
                if (feature) {
                  return Object.entries(feature.params).map(([paramName, paramValue], index) => {
                    return <ProFormText label={paramName} name={paramName} initialValue={paramValue} allowClear={false} key={index} />;
                  });
                }
              }}
            </ProFormDependency>
            <Form.Item {...tailItemLayout}>
              <Button type="primary" onClick={addToTable}>
                添加
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <ProForm.Item name="dataSource" trigger="onValuesChange" noStyle>
              <EditableProTable
                rowKey="id"
                toolBarRender={false}
                columns={columns}
                recordCreatorProps={{
                  newRecordType: "dataSource",
                  position: "top",
                  record: () => ({
                    id: Date.now(),
                    addonBefore: "ccccccc",
                    decs: "testdesc",
                  }),
                }}
                editable={
                  {
                    // type: 'multiple',
                    // editableKeys,
                    // onChange: setEditableRowKeys,
                    // actionRender: (row, _, dom) => {
                    //   return [dom.delete];
                    // },
                  }
                }
              />
            </ProForm.Item>
          </Col>
        </Row>
      </ProForm>
    </div>
  );
}

export default WorkflowCard;
