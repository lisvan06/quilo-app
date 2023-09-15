import TableProducts from "@/app/components/client/tableProducts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductService from "@/app/api/product/service";

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
    // console.log(session.user);
    const data = await getData(session.user);
    // console.log("Products... ", data);
    return (
      <>
        <div className="sm:py-4 bg-[url('/waves-background1.svg')] bg-fixed bg-left-top bg-cover items-center p-3 w-full h-[calc(100vh-128px)]">
          <TableProducts products={data}></TableProducts>
        </div>
      </>
    );
  } catch (error) {}
}
