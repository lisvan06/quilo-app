//Sweet Alert 2
"use client";

// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
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
    console.log("Clicked cancel button");
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

    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  return (
    <>
      <DeleteOutlined
        onClick={showModal}
        style={{ marginTop: "8px", color: "red", fontSize: '20px'}}
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
