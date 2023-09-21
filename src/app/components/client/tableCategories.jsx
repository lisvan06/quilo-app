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
        <div className="flex justify-center items-center mt-2 md:w-80">
          <Table
            bordered={true}
            title={() => (
              <div className="flex justify-between">
                <span className="p-0 mt-1 inline-block align-middle">Categories List</span>
                <BtnAdd
                  route="categories"
                  text="Add"
                  className="float-right"
                ></BtnAdd>
              </div>
            )}
            footer={() => "Footer"}
            dataSource={data}
            columns={columns}
            rowKey={(obj) => obj.id}
            style={{
              width: "95%",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              margin: "10px",
            }}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </>
  );
}
