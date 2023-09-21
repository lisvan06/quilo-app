import { HomeOutlined } from "@ant-design/icons";
import AddCategoryForm from "../../../components/client/addCategoryForm";
import { Breadcrumb } from "antd";

const AddCategory = async () => {
  try {
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
                title: "Add",
              },
            ]}
          />
          <div className="sm:py-4 items-center p-3 w-full h-[calc(100vh-128px)]">
            <AddCategoryForm myAction={"create"} />
          </div>
        </div>
      </>
    );
  } catch (error) {}
};

export default AddCategory;
