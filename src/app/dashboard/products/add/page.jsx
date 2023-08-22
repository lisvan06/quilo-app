import CategoryService from "@/app/api/category/service";
import AddProductForm from "../../../components/client/addProductForm";

const AddProduct = async () => {
  async function catValues() {
    const catServ = new CategoryService();
    const res = await catServ.getAllCategories();
    const categories = res.data;
    
    return categories.data;
  }

  try {
    const categories = await catValues();
    return (
      <>
        <div className="justify-center h-[calc(100vh-4rem)] items-center flex flex-col ">
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
