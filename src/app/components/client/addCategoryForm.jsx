"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
    // console.log("Creating...");
    // formData.ownerId = session?.user.id;
    // console.log("Datos capturados del Form: ", formData);
    const { name } = formData;

    if (!formData) {
      alert("Complete the fields.");
      return;
    }

    try {
      const res = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name
        }),
      });

      const response = await res.json();
      // console.log("Response ", response);
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
      const response = await fetch(`/api/category/${id}`, {
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 dark:text-zinc-600 rounded-md"
    >
      
      <input
        className="border border-slate-500 px-8 py-2 dark:text-zinc-600 rounded-md"
        type="text"
        placeholder="Descripcion"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="justify-end">
        <button className="float-right bg-indigo-500 hover:bg-indigo-700 text-white font-bold p-3 pl-6 ml-2 rounded-md w-1/3">
          Save
        </button>
        <button
          onClick={btnBack}
          type="button"
          className=" float-right bg-gray-400 hover:bg-gray-600 text-white font-bold p-3 px-6 rounded-md w-1/3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
