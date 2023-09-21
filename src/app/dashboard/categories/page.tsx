import TableCategories from "@/app/components/client/tableCategories";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CategoryService from "@/app/api/categories/service";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

export default async function CategoriesPage() {
  async function getData() {
    const catServ = new CategoryService();
    const result = await catServ.getAllCategories();
    if (result) {
      const categories = result.data;
      return categories;
    }
  }

  const session = await getServerSession(authOptions);

  try {
    const data = await getData();

    return (
      <>
        <div className="sm:py-4 bg-[url('/waves-background1.svg')] bg-fixed bg-left-top bg-cover items-center p-3 w-full h-[calc(100vh-128px)]">
          <Breadcrumb
            items={[
              {
                href: "",
                title: <HomeOutlined />,
              },
              {
                href: "",
                title: (
                  <>
                    <span>Dashboard</span>
                  </>
                ),
              },
              {
                title: "Categories",
              },
            ]}
          />
          <div className="flex justify-center w-full">
            <TableCategories data={data}></TableCategories>
          </div>
        </div>
      </>
    );
  } catch (error) {}
}
