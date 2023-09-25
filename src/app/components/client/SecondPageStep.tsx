import React, {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";

import {
  Button,
  Form,
  FormInstance,
  InputNumber,
  Select,
  Slider,
  Space,
  Switch,
} from "antd";

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
interface SecondPageStepProps {
  onFinish: (values: any) => void;
  initialValues: any;
}

const SecondPageStep = forwardRef<FormInstance | null, SecondPageStepProps>(
  ({ onFinish, initialValues }: any, ref: any) => {
    const form2Ref = useRef<FormInstance | null>(null);

    // Use useImperativeHandle to expose the custom submit function
    useImperativeHandle(ref, () => ({
      submit() {
        form2Ref.current?.submit();
      },
    }));
    return (
      <>
        <div className="relative isolate items-center p-8 w-full">
          <Form
            id="mySecondStepForm"
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            ref={form2Ref}
            initialValues={initialValues}
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="InputNumber">
              <Form.Item name="input-number" noStyle>
                <InputNumber min={1} max={10} />
              </Form.Item>
              <span className="ant-form-text" style={{ marginLeft: 8 }}>
                machines
              </span>
            </Form.Item>

            <Form.Item name="switch" label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item name="slider" label="Slider">
              <Slider
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
          </Form>
        </div>
      </>
    );
  }
);

export default SecondPageStep;
