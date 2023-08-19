import Link from "next/link";
import BtnDelete from "./btnDeleteProduct";

const getData = async () => {
  var url = "";
  if (typeof window !== "undefined") {
    url = window.location.origin;
  } else url = process.env.BASE_URL;

  if (url != "") {
    try {
      // url ="https://quilo-app-lisvan06.vercel.app/";
      const response = await fetch(`${url}/api/product`, {
        cache: "no-store",
      });
      const res = await response.json();
      return res;
    } catch (error) {
      console.log("Error : ", error);
    }
  }
};

const ShowProduct = async () => {
  const data = await getData();
  if (typeof data == "object"){
    return (
    <>      
      {data.map((element) => (
        
        <tr key={element.id}>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10">
                <img
                  className="w-full h-full rounded-full"
                  src="https:images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  alt=""
                />
              </div>
            </div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{element.title}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
              {element.description}
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{element.price}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{element.stock}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {element.published ? (
              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                ></span>
                <span className="relative justify-center">Yes</span>
              </span>
            ) : (
              <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                ></span>
                <span className="relative">No</span>
              </span>
            )}
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <Link
              href={`/dashboard/products/edit/${element.id}`}
              className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-violet-400 rounded-lg hover:bg-violet-600 focus:ring-4 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <BtnDelete id={element.id} />
          </td>
        </tr>
      ))}
    </>
  );
  } else return <></>
  
};

export default ShowProduct;
