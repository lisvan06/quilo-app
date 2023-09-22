import ProductService from "@/app/api/products/service";
import AddProductForm from "@/app/components/client/addProductForm";

const Edit = async ({ params }) => {
  let cat = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/categories"
    );
    const data = await response.json();
    cat = data;
  } catch (error) {
    
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

    return (
      <>
        <div className="flex flex-col sm:py-3 dark:to-zinc-600 items-center p-8 w-full">
          <div className="justify-center text-center">            
          </div>
          <AddProductForm
            formValues={data}
            categories={cat}
            myAction="edit"
            id={params.id}
          />
        </div>
      </>
    );
  } catch (error) {}
};

export default Edit;
