"use client";

import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function RegisterPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  let auth = status === "unauthenticated" && !session ? false : true;

  const handleSubmit = async (fieldsValue: any) => {
    const values = await form.validateFields();
    const email = values.email as string;
    const password = values.password as string;
    const username = values.username as string;
    try {
      const signUpResponse = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });

      if (signUpResponse.status === 200) {
        //If user has been registered correctly
        const res = await signIn("credentials", {
          //Sign in the user
          email: email,
          password: password,
          redirect: false,
        });

        if (res?.ok) {
          //If sign in was successful
          // redirect("/dashboard/profile");
          //router.refresh();
          return router.push("/dashboard/profile");
        } else return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        messageApi.open({
          type: "error",
          content: error.response?.data.message,
          style: {
            marginTop: "10vh",
            marginLeft: "auto",
          },
        });
      }
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <>
      {contextHolder}
      <div className="justify-center h-[calc(100vh-4rem)] items-center flex flex-col bg-[url('/tiendaonline-65.jpg')] bg-fixed bg-left-top bg-cover">
        <h1 className="text-4xl font-bold mb-2 text-white">Register</h1>
        <p className="text-white text-lg mb-2">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 dark:text-cyan-400">
            Login
          </Link>
        </p>
        <hr className="mb-4" />
        <div className="flex flex-col itms-center">
          <Form
            name="time_related_controls"
            onFinish={handleSubmit}
            form={form}
            style={{
              borderRadius: 10,
              width: 250,
              clear: "both",
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "1rem",
              display: "flex-col",
              justifyContent: "center",
            }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="johndoe"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
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
              <Button type="primary" htmlType="submit" className="my-button">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
