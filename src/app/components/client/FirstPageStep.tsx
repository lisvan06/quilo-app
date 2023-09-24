import React, { ChangeEvent, useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import { format } from "url";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const FirstPageStep = ({getFormDataValues}: any) => {
  const [form1Step] = Form.useForm();

  const onChangeItemValue = () => {
    // setFormValues(form);
    getFormDataValues(form1Step, 1);
  };

  return (
    <>
      <div className="relative isolate items-center p-8 w-full">
        <Form
          form={form1Step}
          id="myFirstStepForm"
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
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="select"
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select
              placeholder="Please select a country"
              onChange={onChangeItemValue}
            >
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="select-multiple"
            label="Select[multiple]"
            required
            rules={[
              {
                required: true,
                message: "Please select your favourite colors!",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Please select favourite colors"
              onChange={onChangeItemValue}
            >
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button htmlType="reset" id="resetButton">
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FirstPageStep;
