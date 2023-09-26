import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Form,
  FormInstance,
  StepProps,
  Steps,
  message,
  theme,
} from "antd";
import FirstPageStep from "./FirstPageStep";
import SecondPageStep from "./SecondPageStep";
import ThirdPageStep from "./ThirdPageStep";
import { LoginOutlined } from "@ant-design/icons";

const StepComponent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [percent, setPercent] = useState(0);
  const [form1, setForm1] = useState<FormInstance>();
  const [form2, setForm2] = useState<FormInstance>();
  const [form3, setForm3] = useState<FormInstance>();

  const form1Ref = useRef<FormInstance>(null);
  const form2Ref = useRef<FormInstance>(null);
  const form3Ref = useRef<FormInstance>(null);

  useEffect(() => {
    // console.log("Form1 Values: ", form1);
    // console.log("Form2 Values: ", form2);
    // console.log("Form3 Values: ", form3);
  }, [form1, form2, form3]);

  const next = () => {
    if (current === 0) {
      form1Ref.current?.submit();
    }
    if (current === 1) {
      form2Ref.current?.submit();
    }
    if (current === 2) {
      form3Ref.current?.submit();
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const clickDone = () => {
    console.log("All Data: ", form1, form2, form3);
    message.success("Processing complete!");
  };

  const onFinishStep1 = (values: any) => {
    setPercent(33);
    setForm1(values);
    setCurrent(1);
  };

  const onFinishStep2 = (values: any) => {
    setPercent(66);
    setForm2(values);
    setCurrent(2);
  };
  const onFinishStep3 = (values: any) => {
    setPercent(100);
    setForm3(values);
    setCurrent(3);
  };

  const steps = [
    {
      title: "First",
      percent: "0%",
      content: (
        <FirstPageStep
          onFinish={onFinishStep1}
          initialValues={form1}
          ref={form1Ref}
        ></FirstPageStep>
      )
    },
    {
      title: "Second",
      percent: "0%",
      content: (
        <SecondPageStep
          onFinish={onFinishStep2}
          initialValues={form2}
          ref={form2Ref}
        ></SecondPageStep>
      ),
    },
    {
      title: "Last",
      percent: "0%",
      content: (
        <ThirdPageStep
          onFinish={onFinishStep3}
          initialValues={form3}
          ref={form3Ref}
        ></ThirdPageStep>
      ),
    },
    {
      title: "Finish",
      content: "You are all done",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title, percent: item.percent }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <div className="relative isolate items-center p-8 w-full">
        <Steps current={current} percent={percent} items={items}/>
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={clickDone}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default StepComponent;
