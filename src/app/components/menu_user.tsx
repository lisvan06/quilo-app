import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default function MenuUser() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  let auth = status === "unauthenticated" && !session ? false : true;

  const items: MenuProps["items"] = [
    {
      label: <p>Welcome, {session?.user?.email.split('@')[0]}</p>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <Link href="/dashboard/profile">Profile</Link>,
      key: "2",
    },
    {
      label: <Link href="/dashboard/products">Products</Link>,
      key: "3",
    }, 
    {
      label: <Link href="/dashboard/categories">Categories</Link>,
      key: "4",
      disabled: (session?.user?.role === "USER") ? false : true, //disable if the user it is not ADMIN
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link href="/api/auth/signout">
          <LogoutOutlined /> Logout{" "}
        </Link>
      ),
      key: "6",
    },
  ];

  return (
    <>
      {!auth ? (
        <Space style={{ float: "right", margin: "0px 1rem" }}>
          <Link href="/login" className="my-link">
            Login
          </Link>
          <Link href="/register" className="my-link">
            Register
          </Link>
        </Space>
      ) : (
        <Space style={{ float: "right", margin: "0px 1rem"}}>
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft" arrow autoFocus >
            <a onClick={(e) => e.preventDefault()} style={{marginBottom: "1rem"}}>
              <Space>
                <Avatar
                src={(session?.user.image) ? session.user.image : "/avatar.png"}
                  size={48}
                  style={{  marginTop: '-5px'}}
                  icon={<UserOutlined />}
                />
              </Space>
            </a>
          </Dropdown>
        </Space>
      )}
    </>
  );
}
