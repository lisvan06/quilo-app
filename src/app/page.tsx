"use client";
import { theme } from "antd";
import StepComponent from "./components/client/StepComponent";

export default function HomePage() {
  return (
    <>
      <div className="isolate flex justify-center p-8  gb-zinc-900 w-full">
        {/* <Button type="primary" onClick={clicked}>Alert!!</Button> */}
        <div className="w-3/5">
          <h1 className="text-4xl font-bold mb-6 text-gray-700">Home Page</h1>
          <StepComponent/>
        </div>
      </div>
    </>
  );
}
