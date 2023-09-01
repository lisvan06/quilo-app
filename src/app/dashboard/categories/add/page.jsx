import CategoryService from "@/app/api/category/service";
import AddCategoryForm from "../../../components/client/addCategoryForm";

const AddCategory = async () => {  
  try {
    return (
      <>
        <div className=" flex flex-col h-[calc(100vh-4rem)] items-center bg-white p-8 w-full dark:bg-gray-900 ">
          <div className="justify-center text-center">
            <h1 className="text-4xl font-bold mb-2 dark:text-zinc-400">
              Add Category
            </h1>
          </div>
          <AddCategoryForm myAction={"create"}/>
        </div>
      </>
    );
  } catch (error) {
    
  }  
};

export default AddCategory;
