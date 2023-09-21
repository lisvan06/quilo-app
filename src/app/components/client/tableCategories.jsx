"use client";

import { Table } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BtnDelete from "../client/btnDelete";
import BtnEdit from "../server/btnEdit";
import BtnAdd from "../server/btnAdd";

export default function TableCategories({ data }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClickAdd = function () {
    router.push("/dashboard/categories/add");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-center items-center place-content-evenly">
          <BtnEdit id={record.id} route={"categories"} />
          <BtnDelete id={record.id} route={"categories"} />
        </div>
      ),
    },
  ];
  return (
    <>
      <div>
        <BtnAdd route="categories" text="Add"></BtnAdd>
        <div className="flex justify-center items-center mt-2 md:w-80">
          <Table
            dataSource={data}
            columns={columns}
            style={{
              width: "95%",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              margin: "10px",
            }}
          />
          ;
        </div>
      </div>
    </>
  );
}
