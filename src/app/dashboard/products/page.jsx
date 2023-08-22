
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

          //console.log(res.data);

          //With this implementation the page dont show the products list

      const products = res.data;

      return products;
    } catch (error) {}
  }

  const session = await getServerSession(authOptions);

  try {
    // console.log(session.user);
    const data = await getData(session.user);
    return (
      <>
        <TableProducts data={data}></TableProducts>
      </>
    );
  } catch (error) {}
}
