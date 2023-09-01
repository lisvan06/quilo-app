"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { Button, Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status, update } = useSession();
  //const [error, setError] = useState("");
  const router = useRouter();
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  let auth = status === "unauthenticated" && !session ? false : true;

  // if (auth) {
  //   return redirect("/dashboard");
  // } else {
    const onFinish = async () => {
      try {
        const values = await form.validateFields();
        // console.log("Success:", values);

        const email = values.email as string;
        const password = values.password as string;

        // const hashedPass = await bcrypt.hash(password, 12);

        const res = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });

        if (res?.error) {
          messageApi.open({
            type: "error",
            content: res.error as string,
          });

          return;
        }

        if (res?.ok) {
          console.log("All OK");
          return router.push("/dashboard");
        }
      } catch (errorInfo) {
        messageApi.open({
          type: "error",
          content: errorInfo as string,
        });
      }
    };

    return (
      <>
        {contextHolder}
        <div className=" h-[calc(100vh-4rem)] items-center flex flex-col bg-[url('/tiendaonline-65.jpg')] bg-fixed bg-left-top bg-cover">
          <h1 className="text-4xl font-bold mb-2 text-white mt-28">Login</h1>
          <p className="text-lg mb-2 text-white">
            Don't have an account?{" "}
            <Link href="/register" className="text-cyan-400 dark:text-cyan-400">
              Register
            </Link>
          </p>
          <hr className="mb-4" />
          <Form
            form={form}
            onFinish={onFinish}
            style={{
              borderRadius: 10,
              width: 250,
              clear: "both",
              border: "1px solid #ccc",
              padding: "1rem",
              backgroundColor: "white",
              display: "flex-col",
              justifyContent: "center",
            }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="johndoe@gmail.com"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="******" />
            </Form.Item>

            <div className="flex place-content-center">
              <Button type="primary" className="my-button" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </>
    );
  // }
}
