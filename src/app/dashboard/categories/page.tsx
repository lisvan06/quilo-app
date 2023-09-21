import TableCategories from "@/app/components/client/tableCategories";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CategoryService from "@/app/api/categories/service";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

export default async function CategoriesPage() {
  let categories = [];
  try {
    const catServ = new CategoryService();
    const result = await catServ.getAllCategories();
    categories = result;
  } catch (error) {
    return [];
  }

  const session = await getServerSession(authOptions);

  try {
    return (
      <>
        <div className="sm:py-4 items-center p-3 w-full">
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
            <TableCategories data={categories}></TableCategories>
          </div>
        </div>
      </>
    );
  } catch (error) {}
}
