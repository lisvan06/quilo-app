"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import BtnAdd from "@/app/components/client/btnAdd";
import CardProduct from "./cardProduct";
import Search from "antd/es/input/Search";
import { Pagination } from "antd";

export default function TableProducts({ products }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const product = products.products;
  // console.log("Products", products);

  const handleClickAdd = function () {
    router.push("/dashboard/products/add");
  };

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="sm:py-4 bg-[url('/waves-background.svg')] bg-fixed bg-left-top bg-cover items-center p-3 w-full">
        <div className=" flex justify-center mb-10 w-full">
          <BtnAdd route={"products"} text={"Add"}></BtnAdd>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            style={{ margin: "0.5rem", width: "20rem" }}
          />
        </div>
        <div className="flex flex-col w-full justify-center items-center sm:flex-row sm:flex-wrap">
          {Array.isArray(product) ? (
            product.map((element) => (
              <CardProduct key={element.id} product={element}></CardProduct>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="h-9 flex justify-center w-full mb-5">
        <Pagination defaultCurrent={1} total={40}></Pagination>{" "}
      </div>
      </div>
      
    </>
  );
}
