"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import ProductForm from "@/app/components/forms/productForm";

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
      <ProductForm></ProductForm>
    </div>
  );
}