import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Button, Form, FormInstance, Select, Space } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
interface FirstPageStepProps {
  onFinish: (values: any) => void;
  initialValues: any;
}

const FirstPageStep = forwardRef<FormInstance | null, FirstPageStepProps>(
  ({ onFinish, initialValues }: any, ref: any) => {
    const form1Ref = useRef<FormInstance | null>(null);

    // Use useImperativeHandle to expose the custom submit function
    useImperativeHandle(ref, () => ({
      submit() {
        form1Ref.current?.submit();
      },
      getFieldsValue() {
        form1Ref.current?.getFieldsValue();
      }
    }));

    return (
      <div className="relative isolate items-center p-8 w-full">
        <Form
          id="myFirstStepForm"
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={initialValues}
          ref={form1Ref}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="country"
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="colors"
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
            >
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    );
  }
);
export default FirstPageStep;
