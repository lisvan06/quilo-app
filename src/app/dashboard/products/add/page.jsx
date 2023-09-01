import CategoryService from "@/app/api/category/service";
import AddProductForm from "../../../components/client/addProductForm";

const AddProduct = async () => {
  async function catValues() {
    const catServ = new CategoryService();
    const res = await catServ.getAllCategories();
    const categories = res.data;
    
    return categories;
  }

  try {
    const categories = await catValues();
    return (
      <>
        <div className="flex flex-col overflow-hidden sm:py-3 dark:to-zinc-600 bg-[url('/waves-background.svg')] bg-fixed bg-left-top bg-cover 2xl:h-[calc(100vh-4rem)] items-center p-8 w-full sm:h-[calc(100vh-1rem)]">
          <div className="justify-center text-center">
            <h1 className="text-4xl font-bold mb-2 dark:text-zinc-400">
              Add Product
            </h1>
          </div>
          <AddProductForm categories={categories} myAction="create"/>
        </div>
      </>
    );
  } catch (error) {
    
  }  
};

export default AddProduct;
