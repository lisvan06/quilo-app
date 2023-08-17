export default function ProductForm() {
  return (
    <>
    
    <h2 className="flex text-gray-600 justify-left mb-2 font-semibold">Products List</h2>
    <div className="flex w-full justify-center items-center">    
      <form className="flex flex-rowjustify-center w-full bg-gray-100 p-2 text-sky-700 rounded-md shadow-md mx:flex-col dark:bg-gray-700">
        <div className="m-2">
          <input
            type="text"
            className="p-2 border rounded-md focus:outline-none focus:ring-sky-500 focus:border-blue-300"
            placeholder="You"
            name="ownerId"
            readOnly
            hidden
          />
        </div>
        <div className="m-2 w-1/6">
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-sky-500 focus:border-blue-300"
            placeholder="Title"
            name="title"
          />
        </div>
        <div className="m-2 w-1/2">
          <input
            type="textarea"
            className="flex-auto w-full p-2 border rounded-md focus:outline-none focus:ring-sky-500 focus:border-blue-300"
            placeholder="Description"
            name="description"
          />
        </div>
        <div className="m-2 w-1/12">
          <input
            type="number"
            className="p-2 w-full border rounded-md focus:outline-none focus:ring-sky-500 focus:border-blue-300"
            placeholder="Stock"
            name="stock"
          />
        </div>
        <div className="m-2 w-1/12">
          <input
            type="number"
            className="p-2 w-full border rounded-md focus:outline-none focus:ring-sky-500 focus:border-blue-300"
            placeholder="Price"            
            name="price"
          />
        </div>
        <div className="w-1/12">
          <button
            type="submit"
            className="flex-1 w-full bg-blue-500 text-white px-4 py-2 m-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>    
      {/* <form className="w-full p-6 bg-gray-100 rounded-md shadow-md">
        <div className="container flex flex-col space-y-4 ml:flex-row md:flex-row md:space-y-0 md:space-x-4">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto"
            placeholder="Input 1"
          />
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto"
            placeholder="Input 1"
          />
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto"
            placeholder="Input 2"
          />
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto"
            placeholder="Input 3"
          />
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto"
            placeholder="Input 4"
          />
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md w-full md:w-auto"
          >
            Add
          </button>
        </div>
      </form> */}
    </>
  );
}

{
  /* </div> */
}
{
  /* <form id="myAddFormProduct" method="post" className="flex flex-row col-span-6 clear-both"> */
}
{
  /* <div className="flex justify-center items-center h-screen"> */
}
{
  /* <input
          type="text"
          name="ownerId"
          placeholder="Some Title"
          className="bg-zinc-800 px-4 py-2 text-white hidden"
        />
        <input
          type="text"
          name="title"
          placeholder="Some Title"
          className="bg-zinc-800 px-4 py-2 block m-1 text-white"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Some Description"
          className="bg-zinc-800 px-4 py-2 block m-1 text-white"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="bg-zinc-800 px-4 py-2 block m-1 text-white"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="bg-zinc-800 px-4 py-2 block m-1 text-white"
          required
        />
        <button className="float-center m-1 bg-indigo-500 px-4 py-2 rounded-md  text-white hover:bg-indigo-600 transition-colors mb-2">
          Add Product
        </button> */
}
// </form>
