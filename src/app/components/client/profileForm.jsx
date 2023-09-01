import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserService from "@/app/api/user/service";
import { Button, Form, Input, message } from "antd";

export default function ProfileForm() {
  const { data: session, status, update } = useSession();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [address, setAddress] = useState("");
  const [enterprise, setEnterprise] = useState("");

  useEffect(() => {
    if (session?.user) {
      // console.log(formValues);
      // setAddress(session?.user?.address);
      // setEnterprise(session?.user?.enterprise);
      form.setFieldsValue({
        enterprise: session?.user?.enterprise,
        address: session?.user?.address,
      });
    }
  }, []);

  const router = useRouter();

  async function updateSession(user) {
    await update({
      ...session,
      user: {
        ...session?.user,
        enterprise: user.enterprise,
        address: user.address,
      },
    });
  }

  if (status === "authenticated") {
    const handleClick = async () => {
      try {
        const values = await form.validateFields();
        values.ownerId = session?.user?.id;
        console.log("Values ", values);

        const newU = new UserService();
        const editedUser = await newU.updateUser(values, values.ownerId);

        if (editedUser) {
          // messageApi.open({
          //   type: "success",
          //   content: "Data saved",
          // });

          updateSession(editedUser.data.data);
        } else {
          messageApi.open({
            type: "error",
            content: "Error saving data",
          });
        }
      } catch (error) {
        console.log("error in request", error);
        messageApi.open({
          type: "error",
          content: "Error saving data",
        });
      }
    };

    return (
      <>
        <Form
          form={form}
          id="profileForm"
          method="post"
          style={{
            borderRadius: 10,
            clear: "both",
            padding: "1rem",
            display: "flex-col",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            name="id"
            hidden
            placeholder="Some Title"
            defaultValue={session?.user?.id}
          />
          <Form.Item
            name="enterprise"
            initialValue={session?.user?.enterprise}
            style={{ marginBottom: "10px" }}
          >
            <Input placeholder="Enterprise" />
          </Form.Item>
          <Form.Item
            name="address"
            initialValue={session?.user?.address}
            style={{ marginBottom: "10px" }}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Form>
        <div className="flex place-content-center mt-0 ">
          <Button type="primary" className="my-button" onClick={handleClick}>
            Save
          </Button>
        </div>
      </>
    );
  }
}
