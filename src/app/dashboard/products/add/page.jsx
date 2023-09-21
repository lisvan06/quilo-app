import AddProductForm from "../../../components/client/addProductForm";

const AddProduct = async () => {
  let cat = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/categories", {
        method: "GET",
      }
    );
    const data = await response.json();
    cat = data;
    console.log("Categories: ", cat);
  } catch (error) {
    
  }

  try {
    return (
      <>
        <div className="flex flex-col sm:py-3 p-8 w-full">
          <AddProductForm myAction="create" categories={cat} 
            formValues={{}}/>
        </div>
      </>
    );
  } catch (error) {
    return <><h1>Error</h1></>
  }
};

export default AddProduct;
