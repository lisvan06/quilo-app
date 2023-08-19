"use client";
import AddProductForm from "../../../components/forms/addProductForm";
import { useRouter } from "next/navigation";
const uri ="http://localhost:3000";

const AddProduct = () => {
  const router = useRouter();

  const onSubmitCreate = async (formData) => {
    console.log("Datos capturados del Form: ", formData);
    const { title, description, price, stock } = formData;

    if (!formData) {
      alert("Complete the fields.");
      return;
    }
    //console.log(`Name: ${name} Age: ${age}`);
    try {
      // const url = window.location.origin;
      const response = await fetch(uri+'/api/product', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, price, stock }),
      });
      if (response.ok) {
        router.refresh();
        router.push("/dashboard/products");
      } else {
        throw new Error("Failed to create.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="justify-center h-[calc(100vh-4rem)] items-center flex flex-col ">
      <div className="justify-center text-center">
        <h1 className="text-4xl font-bold mb-2 dark:text-zinc-400">
          Add Product
        </h1>
      </div>
        <AddProductForm onSubmitForm={onSubmitCreate} />
      </div>
    </>
  );
};

export default AddProduct;
