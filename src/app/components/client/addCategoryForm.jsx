"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, Input } from "antd";

const AddCategoryForm = ({ formValues, myAction, id }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");

  useEffect(() => {
    if (formValues) {
      // console.log(formValues);
      setName(formValues.name);
    }
  }, [formValues]);

  const btnBack = () => {
    router.push("/dashboard/categories");
  };

  const onSubmitCreate = async (formData) => {
    const { name } = formData;

    if (!formData) {
      alert("Complete the fields.");
      return;
    }

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      const response = await res.json();
      if (response) {
        router.refresh();
        router.push("/dashboard/categories");
      } else {
        throw new Error("Failed to create.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitEdit = async (formData) => {
    console.log("Editing...");
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update.");
      }
      router.refresh();
      router.push("/dashboard/categories");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name };

    if (myAction == "edit") onSubmitEdit(formData);
    else onSubmitCreate(formData);
  };

  return (
    <>
      <div className="mt-4 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 md:w-80 rounded-md"
        >
          <Input
            style={{ width: "100%" }}
            placeholder="Descripcion"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
    </>
  );
};

export default AddCategoryForm;
