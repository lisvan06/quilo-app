"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AddProductForm = ({ formValues, onSubmitForm }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (formValues) {
      setTitle(formValues.title);
      setDescription(formValues.description);
      setPrice(formValues.price);
      setStock(formValues.stock);
    }
  }, [formValues]);

  const btnBack = () => {
    router.back();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { title, description, price, stock };
    onSubmitForm(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      
      <input
        className="border border-slate-500 px-8 py-2 dark:text-zinc-600 rounded-md"
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea cols="30" rows="5"
        className="border border-slate-500 px-8 py-2 dark:text-zinc-600 rounded-md"
        type="string"   
        name="description"     
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        className="border border-slate-500 px-8 py-2 dark:text-zinc-600 rounded-md"
        type="number"
        name="price"
        step={0.01}
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="border border-slate-500 px-8 py-2 dark:text-zinc-600 rounded-md"
        type="number"
        name="stock"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <div>
        <button className="float-right bg-indigo-500 hover:bg-indigo-700 text-white font-bold p-3 px-6 rounded-md w-1/2">
          Save
        </button>
      </div>
      <div>
        <button
          onClick={btnBack}
          type="button"
          className="float-right bg-gray-400 hover:bg-gray-600 text-white font-bold p-3 px-6  rounded-md w-1/2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
