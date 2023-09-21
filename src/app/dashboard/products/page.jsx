import TableProducts from "@/app/components/client/tableProducts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductService from "@/app/api/products/service";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import BtnAdd from "@/app/components/server/btnAdd";

export default async function productsPage() {
  async function getData(user) {
    try {
      var role = user.role;
      //role = "ADMIN";
      const newP = new ProductService();

      const res =
        role === "USER"
          ? await newP.getProductsByOwnerId(user.id)
          : await newP.getAllProducts();

      const products = res.data;
      return products;
    } catch (error) {}
  }

  const session = await getServerSession(authOptions);

  try {
    const data = await getData(session.user);

    return (
      <>
        <div className="sm:py-4 items-center p-3 w-full">
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
          <div className="sm:py-4 items-center p-3 w-full h-full">
            <TableProducts products={data}></TableProducts>
          </div>
        </div>
      </>
    );
  } catch (error) {}
}
