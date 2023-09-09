import CategoryService from "@/app/api/category/service";
import AddCategoryForm from "../../../components/client/addCategoryForm";
import { Breadcrumb } from "antd";

const AddCategory = async () => {
  try {
    return (
      <>
        <div className="sm:py-4 bg-[url('/waves-background1.svg')] bg-fixed bg-left-top bg-cover items-center p-3 w-full h-[calc(100vh-128px)]">
          <AddCategoryForm myAction={"create"} />
        </div>
      </>
    );
  } catch (error) {}
};

export default AddCategory;
