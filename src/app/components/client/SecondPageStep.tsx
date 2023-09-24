import React, { useEffect, useState } from "react";

import { Button, Form, InputNumber, Select, Slider, Space, Switch } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const SecondPageStep = ({ getFormDataValues }: any) => {
  const [form2Step] = Form.useForm();

  const onChangeItemValue = () => {
    console.log("Changing in Second Page");
    getFormDataValues(form2Step, 2);
  };

  return (
    <>
      <div className="relative isolate items-center p-8 w-full">
        <Form
          form={form2Step}
          id="mySecondStepForm"
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            "input-number": 3,
            "checkbox-group": ["A", "B"],
            rate: 3.5,
            "color-picker": null,
          }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="InputNumber">
            <Form.Item name="input-number" noStyle>
              <InputNumber min={1} max={10} onChange={onChangeItemValue} />
            </Form.Item>
            <span className="ant-form-text" style={{ marginLeft: 8 }}>
              machines
            </span>
          </Form.Item>

          <Form.Item name="switch" label="Switch" valuePropName="checked">
            <Switch onChange={onChangeItemValue}/>
          </Form.Item>

          <Form.Item name="slider" label="Slider">
            <Slider
              onChange={onChangeItemValue}
              marks={{
                0: "A",
                20: "B",
                40: "C",
                60: "D",
                80: "E",
                100: "F",
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SecondPageStep;
