"use client";

import AddProductForm from "@/app/components/client/addProductForm";
import { useRouter } from "next/navigation";

const Edit = async ({ params }) => {
  const router = useRouter();
  const getDataById = async (id) => {
    try {
      // const address_url = window.location.origin;      
      const response = await fetch(`/api/product/${id}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to update.");
      } else return response.json();
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const id = params.id;
  const { data } = await getDataById(id);
  //console.log("documento completo :"+JSON.stringify(data)); //recibo el documento
  //const {name, age} = data

  const onSubmitEdit = async (formData) => {
    try {
      const response = await fetch(`/api/product/${id}`, {
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
      router.push("/dashboard/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="justify-center h-[calc(100vh-4rem)] items-center flex flex-col ">
        <div className="justify-center text-center">
          <h1 className="text-4xl font-bold mb-2 dark:text-zinc-400">
            Edit Product
          </h1>
        </div>
        <AddProductForm onSubmitForm={onSubmitEdit} formValues={data} />
      </div>
    </>
  );
};

export default Edit;
