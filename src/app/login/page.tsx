"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Divider, Form, Input, message } from "antd";
import { GoogleOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  let auth = status === "unauthenticated" && !session ? false : true;

  const handleGoogleSignIn = () => {
    signIn("google"); // 'google' corresponds to the Google provider configured in NextAuth.js
  };

  const handleFacebookSignIn = () => {
    signIn("facebook"); // 'facebook' corresponds to the Facebook provider configured in NextAuth.js
  };

  // if (auth) {
  //   return redirect("/dashboard");
  // } else {
  const onFinish = async () => {
    try {
      const values = await form.validateFields();

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

      {session ? (
        // User is already authenticated
        // <p>Welcome, {session.user.email}!</p>
        <p></p>
      ) : (
        <div className="items-center flex flex-col">
          <h1 className="text-4xl font-bold mb-2 text-gray-700 mt-28">Login</h1>
          {/* "Authenticate with Google" button */}

          {/* "Authenticate with Facebook" button */}
          {/* <button onClick={handleFacebookSignIn}>Authenticate with Facebook</button> */}
          <p className="text-lg mb-2 text-gray-600">
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

          <div className="w-56 h-1 my-4 flex justify-center flex-col mt-10">
            <Divider style={{ width: "50px" }}>Or</Divider>
            <Button type="primary" onClick={handleGoogleSignIn} icon={<GoogleOutlined />}>
              Log In with Google
            </Button>
          </div>
        </div>
      )}
    </>
  );
  // }
}
