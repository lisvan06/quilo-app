import React, { useEffect, useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  Form,
  Rate,
  Row,
  Select,
  Space,
  Upload,
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

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const ThirdPageStep = ({ getFormDataValues }: any) => {
  const [form3Step] = Form.useForm();

  const onChangeItemValue = () => {
    console.log("Changing in Third Page");
    getFormDataValues(form3Step, 3);
  };

  return (
    <>
      <div className="relative isolate items-center p-8 w-full">
        <Form
          form={form3Step}
          id="myThirdStepForm"
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
          <Form.Item name="checkbox-group" label="Checkbox.Group">
            <Checkbox.Group onChange={onChangeItemValue}>
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

          <Form.Item name="rate" label="Rate">
            <Rate onChange={onChangeItemValue} />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="File"
          >
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              onChange={onChangeItemValue}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="color-picker"
            label="ColorPicker"
            rules={[{ required: true, message: "color is required!" }]}
          >
            <ColorPicker onChange={onChangeItemValue} />
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

export default ThirdPageStep;
