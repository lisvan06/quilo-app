import React, { useEffect, useRef, useState } from "react";

import { Button, FormInstance, Steps, message, theme } from "antd";
import FirstPageStep from "./FirstPageStep";
import SecondPageStep from "./SecondPageStep";
import ThirdPageStep from "./ThirdPageStep";

const StepComponent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form1, setForm1] = useState<FormInstance>();
  const [form2, setForm2] = useState<FormInstance>();
  const [form3, setForm3] = useState<FormInstance>();
  const [stepStatus, setStepStatus] = useState([
    "error",
    "wait",
    "process",
    "finish",
  ]);

  useEffect(() => {
    console.log("FormStep1: ", form1?.getFieldsValue());
    console.log("FormStep2: ", form2?.getFieldsValue());
    console.log("FormStep3: ", form3?.getFieldsValue());
  }, [form1, form2, form3]);

  const getFormDataValues = (
    formPassedFromChild: FormInstance,
    page: number
  ) => {
    if (!formPassedFromChild) return;
    if (page === 1) {setForm1(formPassedFromChild); return;}
    if (page === 2) {setForm2(formPassedFromChild);return;}
    if (page === 3) {setForm3(formPassedFromChild); return;}

    return;
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const clickDone = () => {
    message.success("Processing complete!");
  };

  const steps = [
    {
      title: "First",
      content: (
        <FirstPageStep getFormDataValues={getFormDataValues}></FirstPageStep>
      ),
    },
    {
      title: "Second",
      content: (
        <SecondPageStep getFormDataValues={getFormDataValues}></SecondPageStep>
      ),
    },
    {
      title: "Last",
      content: (
        <ThirdPageStep getFormDataValues={getFormDataValues}></ThirdPageStep>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

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
        <Steps
          current={current}
          items={items}
          key="myStepComponent"
        ></Steps>
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
