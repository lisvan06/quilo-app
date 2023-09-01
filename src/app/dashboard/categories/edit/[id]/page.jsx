import CategoryService from "@/app/api/category/service";
import AddCategoryForm from "@/app/components/client/addCategoryForm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const EditCategory = async ({ params }) => {
  // const session = await getServerSession (authOptions);
 
  const getDataById = async (id) => {
    try {
      const serv = new CategoryService();
      const res = await serv.getCategoryById(id);

      const categories = res.data;
      return categories;
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const id = params.id;
  const { data } = await getDataById(id);

  return (
    <>
      <div className=" flex flex-col h-[calc(100vh-4rem)] items-center bg-white p-8 w-full dark:bg-gray-900 ">
        <div className="justify-center text-center">
          <h1 className="text-4xl font-bold mb-2 dark:text-zinc-400">
            Edit Product
          </h1>
        </div>
        <AddCategoryForm formValues={data} myAction={"edit"} id={params.id} />
      </div>
    </>
  );
};

export default EditCategory;
