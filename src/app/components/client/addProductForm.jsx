"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Breadcrumb, Button, Checkbox, Form, Input, Upload } from "antd";

import { ComboCategory } from "@/app/components/server/comboCategory";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";

const AddProductForm = ({ formValues, categories, myAction, id }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const productId = id;
  const { TextArea } = Input;
  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageId, setImageId] = useState("");

  useEffect(() => {
    if (formValues) {
      // console.log(formValues);
      setTitle(formValues.title);
      setDescription(formValues.description);
      setPrice(formValues.price);
      setStock(formValues.stock);
      setOwnerId(formValues.ownerId);
      setCategoryId(formValues.categoryId);
      setImageId(formValues.imageId);
    }
  }, [formValues]);

  const btnBack = () => {
    router.push("/dashboard/products");
  };

  const childToParent = (e) => {
    // console.log("Category ...", e);
    setCategoryId(e);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    name: 'file',
    action: '/api/upload',
    method: "POST",
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onSubmit = async (formData, method) => {
    formData.ownerId = session?.user.id;
    // console.log("Datos capturados del Form: ", formData);
    const { title, description, price, stock, ownerId, categoryId, imageId } = formData;

    if (!formData) {
      alert("Complete the fields.");
      return;
    }

    try {
      const url =
        method === "PUT" ? `/api/product/${productId}` : `/api/product/`;

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const response = await res.json();
      // console.log("Response ", response);
      if (response) {
        router.refresh();
        router.push("/dashboard/products");
      } else {
        throw new Error("Failed to create.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { title, description, price, stock, ownerId, categoryId, file };

    if (myAction == "edit") onSubmit(formData, "PUT");
    else onSubmit(formData, "POST");
  };

  return (
    <>
      <Breadcrumb
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "/dashboard",
            title: (
              <>
                <span>Dashboard</span>
              </>
            ),
          },
          {
            href: "/dashboard/products",
            title: (
              <>
                <span>Products</span>
              </>
            ),
          },
          {
            title: (myAction === 'edit') ? "Edit" : "Add",
          },
        ]}
      />

      <div className="flex w-full justify-center items-center">
        <div className="mt-4 flex items-center p-4 bg-white shadow-lg rounded-lg w-60">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-md"
          >
            <input
              type="text"
              name="ownerId"
              placeholder="Owner Id"
              defaultValue={session?.user.id}
              onChange={(e) => setOwnerId(session?.user.id)}
              hidden
            />

            <Input
              maxLength={20}
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {
              <ComboCategory
                categories={categories}
                childToParent={childToParent}
              />
            }
            <TextArea
              cols={30}
              rows={5}
              minLength={30}
              type="string"
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Input
              type="number"
              name="price"
              step={0.01}
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <Input
              rules={[{ required: true }]}
              type="number"
              name="stock"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            {/* <Form.Item
              name="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              
            >
            </Form.Item> */}
              <Upload name="file" listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit" className="mr-2">
                Save
              </Button>
              <Button
                danger
                type="primary"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
