"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Breadcrumb, Button, Input } from "antd";

import { ComboCategory } from "@/app/components/server/comboCategory";
import { HomeOutlined } from "@ant-design/icons";

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

  const [imageUploaded, setImageUploaded] = useState();

  useEffect(() => {
    if (formValues) {
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
    console.log("Category ...", e);
    setCategoryId(e);
  };

  const handleChange = (event) => {
    const { files } = event.target;
    if (!files?.length) {
      return;
    }
    setImageUploaded(files[0]);
  };

  const onSubmit = async (formData, method) => {
    formData.ownerId = session?.user.id;
    const { title, description, price, stock, ownerId, categoryId, imageId } =
      formData;

    if (!formData) {
      alert("Complete the fields.");
      return;
    }

    if (!imageUploaded) {
      alert("Complete the Image.");
      return;
    }

    let formDataImage = new FormData();
    formDataImage.image = imageUploaded;

    try {
      const responseBlob = await fetch(
        `/api/upload?filename=${imageUploaded.name}`,
        {
          method: "POST",
          body: formDataImage.image,
        }
      );

      const newBlob = await responseBlob.json();

      formDataImage = new FormData();
      formDataImage.url = newBlob.url;
      formDataImage.pathname = newBlob.pathname;
      formDataImage.contentDisposition = newBlob.contentDisposition;

      //Add an image to mongodb and get the id with /api/image route fetch
      console.log(formDataImage.url);
      //return;
      const responseImage = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formDataImage),
      });

      //get the id for insert the image on Product Collection
      const idImage = await responseImage.json();
      formData.imageId = idImage.id;

      const url =
        method === "PUT" ? `/api/products/${productId}` : `/api/products/`;

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const response = await res.json();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      price,
      stock,
      ownerId,
      categoryId,
      imageId,
    };

    myAction == "edit" ? onSubmit(formData, "PUT") : onSubmit(formData, "POST");
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
            title: myAction === "edit" ? "Edit" : "Add",
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
              onChange={(e) =>
                setOwnerId(session?.user ? session?.user.id : "")
              }
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
            {<ComboCategory categories={categories} childToParent={childToParent} actualValue={formValues.categoryId}/>}
            <TextArea
              cols={30}
              rows={5}
              minLength={30}
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
              type="number"
              name="stock"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            {/* <Form.Item
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item> */}
            <Input
              onChange={handleChange}
              accept=".jpg, .png, .gif, .jpeg"
              type="file"
              className="w-full"
            ></Input>
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
