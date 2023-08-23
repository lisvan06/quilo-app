import TableCategories from "@/app/components/client/tableCategories";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CategoryService from "@/app/api/category/service";

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
        <TableCategories data={data}></TableCategories>
      </>
    );
  } catch (error) {}
}
