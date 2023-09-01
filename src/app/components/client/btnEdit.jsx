import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";

const BtnEdit = ({ id, route }) => {
  return (
    <>
      <Link
        href={`/dashboard/${route}/edit/${id}`}
        className="flex flex-col items-center py-2 text-sm font-medium text-center text-green-400 hover:text-green-600  focus:outline-none"
      >
        <EditOutlined style={{fontSize: '20px'}}/>
      </Link>
    </>
  );
};

export default BtnEdit;
