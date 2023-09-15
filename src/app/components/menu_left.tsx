import { Menu } from "antd";
import {
  ExclamationCircleOutlined,
  HomeOutlined,
  OrderedListOutlined,
  QuestionCircleOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export default function MenuLeft() {
  return (
    <>
      <Menu
        // theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: <Link href="/">Home</Link>            
          },
          {
            key: "2",
            icon: <ExclamationCircleOutlined />,
            label: <Link href="/about">About</Link>,
          },
          {
            key: "3",
            icon: <QuestionCircleOutlined />,
            label: <Link href="/help">Help</Link>,
          },
          {
            key: "4",
            icon: <ReconciliationOutlined />,
            label: <Link href="/dashboard/products">Products</Link>,
          },
          {
            key: "5",
            icon: <OrderedListOutlined />,
            label: <Link href="/dashboard/categories">Categories</Link>,
          },
        ]}
      />
    </>
  );
}
