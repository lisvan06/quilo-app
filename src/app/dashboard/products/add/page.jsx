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
        <div className="flex flex-col overflow-hidden sm:py-3 bg-[url('/waves-background1.svg')] bg-fixed bg-left-top bg-cover 2xl:h-[calc(100vh-4rem)] p-8 w-full sm:h-[calc(100vh-128px)]">
        
          <AddProductForm categories={categories} myAction="create"/>
        </div>
      </>
    );
  } catch (error) {
    
  }  
};

export default AddProduct;
