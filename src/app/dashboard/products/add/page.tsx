"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function AddProductsPage() {
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);    
    
    data.ownerId = session?.user?.id as string;

    console.log(data);

    const response = await axios
      .post("/api/product", {
        data
      })
      .then((res) => {
        form.reset();
        setError("");
        setNotice("Product added successfully");        
      })
      .catch((err) => {
        console.log("error in request", err);
        setError("Error adding product");
      });
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] items-center flex flex-col">
      {error && <p className="text-red-500 text-lg mb-2">{error}</p>}
      {notice && <p className="text-green-500 text-lg mb-2">{notice}</p>}

      <h1 className="text-4xl font-bold mb-2">Add Product</h1>

      <hr className="mb-4" />
      <form id="myAddFormProduct" method="post" onSubmit={handleClick}>
        <input
          type="text"
          name="ownerId"
          placeholder="Some Title"
          className="bg-zinc-800 px-4 py-2 mb-2 text-white hidden"
        />
        <input
          type="text"
          name="title"
          placeholder="Some Title"
          className="bg-zinc-800 px-4 py-2 block mb-2 text-white"
          required
        />
        <input
          type="textarea"
          name="description"
          placeholder="Some Description"
          className="bg-zinc-800 px-4 py-2 block mb-2 text-white"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="bg-zinc-800 px-4 py-2 block mb-2 text-white"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="bg-zinc-800 px-4 py-2 block mb-2 text-white"
          required
        />
        <button className="bg-indigo-500 px-4 py-2 rounded-md text-white hover:bg-indigo-600 transition-colors mb-2">
          Add Product
        </button>
      </form>
    </div>
  );
}
