import AddProductForm from "../../../components/client/addProductForm";

const AddProduct = async () => {
  let cat = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/categories"
    );
    const data = await response.json();
    cat = data;
  } catch (error) {
    
  }

  try {
    return (
      <>
        <div className="flex flex-col overflow-hidden sm:py-3 bg-[url('/waves-background1.svg')] bg-fixed bg-left-top bg-cover 2xl:h-[calc(100vh-4rem)] p-8 w-full sm:h-[calc(100vh-128px)]">
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
