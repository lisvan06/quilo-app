"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import BtnAdd from "@/app/components/server/btnAdd";
import CardProduct from "../server/cardProduct";
import Search from "antd/es/input/Search";
import { Breadcrumb, Pagination } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function TableProducts({ products }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const product = products.products;

  const handleClickAdd = function () {
    router.push("/dashboard/products/add");
  };

  const changePagination = (page) => {
    console.log(page);
  };

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <div>
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
              title: "Products",
            },
          ]}
        />
        <div className="flex justify-center w-full">
          <BtnAdd route={"products"} text={"Add"}></BtnAdd>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            style={{ margin: "0.5rem", width: "20rem" }}
          />
        </div>
        <div className="flex flex-wrap">
          {Array.isArray(product) ? (
            product.map((element) => (
              <CardProduct key={element.id} product={element}></CardProduct>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="h-9 flex justify-center w-full mb-5">
          <Pagination
            defaultCurrent={1}
            total={products.total}
            onChange={changePagination}
          ></Pagination>{" "}
        </div>
      </div>
    </>
  );
}
