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
        <div className="flex flex-col sm:py-3 dark:to-zinc-600 bg-[url('/waves-background.svg')] bg-fixed bg-left-top bg-cover 2xl:h-[calc(100vh-4rem)] items-center p-8 w-full sm:h-[calc(100vh-1rem)]">
          <div className="justify-center text-center">            
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
