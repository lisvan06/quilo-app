import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import {
  Checkbox,
  Col,
  Form,
  FormInstance,
  Rate,
  Row,
  Select,
} from "antd";

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
interface ThirdPageStepProps {
  onFinish: (values: any) => void;
  initialValues: any;
}

const ThirdPageStep = forwardRef<FormInstance | null, ThirdPageStepProps>(
  ({ onFinish, initialValues }: any, ref: any) => {
    const form3Ref = useRef<FormInstance | null>(null);

    // Use useImperativeHandle to expose the custom submit function
    useImperativeHandle(ref, () => ({
      submit() {
        form3Ref.current?.submit();
      },
    }));
    return (
      <>
        <div className="relative isolate items-center p-8 w-full">
          <Form
            id="myThirdStepForm"
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            ref={form3Ref}
            initialValues={initialValues}
            style={{ maxWidth: 600 }}
          >
            <Form.Item name="checkbox-group" label="Checkbox.Group">
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="A" style={{ lineHeight: "32px" }}>
                      A
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B" style={{ lineHeight: "32px" }} disabled>
                      B
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C" style={{ lineHeight: "32px" }}>
                      C
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="D" style={{ lineHeight: "32px" }}>
                      D
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="E" style={{ lineHeight: "32px" }}>
                      E
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="F" style={{ lineHeight: "32px" }}>
                      F
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item name="rate" label="Rate" rules={[{ required: true, message: "Please set a rate!" }]}>
              <Rate />
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
);

export default ThirdPageStep;
