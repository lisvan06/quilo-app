import CategoryService from "@/app/api/category/service";
import ProductService from "@/app/api/product/service";
import AddProductForm from "@/app/components/client/addProductForm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Edit = async ({ params }) => {
  // const session = await getServerSession (authOptions);
  async function catValues() {
    const catServ = new CategoryService();
    const res = await catServ.getAllCategories();
    const categories = res.data;

    return categories;
  }

  const getDataById = async (id) => {
    try {
      const prodServ = new ProductService();
      const res = await prodServ.getProductById(id);

      const products = res.data;
      return products;
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  try {
    const id = params.id;
    const { data } = await getDataById(id);

    const categories = await catValues();
    // console.log("Data ", categories);

    return (
      <>
        <div className="justify-center h-[calc(100vh-4rem)] items-center flex flex-col ">
          <div className="justify-center text-center">
            <h1 className="text-4xl font-bold mb-2 dark:text-zinc-400">
              Edit Product
            </h1>
          </div>
          <AddProductForm
            formValues={data}
            categories={categories}
            myAction="edit"
            id={params.id}
          />
        </div>
      </>
    );
  } catch (error) {}
};

export default Edit;
