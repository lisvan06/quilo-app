"use client";

import { useRouter } from "next/navigation";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";

const BtnDelete = ({ id, name }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Are you sure?");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const response = await fetch(`/api/${name}/${id}`, {
      method: "DELETE",
    });
    if (response.ok === false) {
      setModalText(`Your ${name} has not been deleted.`);
      setConfirmLoading(false);
    } else {
      setModalText(`Your ${name} has been deleted.`);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
  };

  return (
    <>
      <DeleteOutlined
        onClick={showModal}
        style={{ color: "red", fontSize: "20px", marginLeft: "8px" }}
      ></DeleteOutlined>
      <Modal
        title="The element will be deleted"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default BtnDelete;
