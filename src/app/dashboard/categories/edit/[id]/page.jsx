import CategoryService from "@/app/api/categories/service";
import AddCategoryForm from "@/app/components/client/addCategoryForm";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

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
      <div className="sm:py-4 items-center p-3 w-full">
      <Breadcrumb
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "/dashboard",
            title: (
              <>
                <span>Dashboard</span>
              </>
            ),
          },
          {
            href: "/dashboard/categories",
            title: (
              <>
                <span>Categories</span>
              </>
            ),
          },
          {
            title: "Edit",
          },
        ]}
      />
        <div className="justify-center text-center">
        </div>
        <AddCategoryForm formValues={data} myAction={"edit"} id={params.id} />
      </div>
    </>
  );
};

export default EditCategory;
