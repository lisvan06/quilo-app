import Link from "next/link";
import BtnDelete from "../client/btnDelete";
import BtnEdit from "../client/btnEdit";

const ShowProduct = ({products, name}) => {
  const data = products.products;
  const user = products;
  // console.log("Username... ", products.username);
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((element) => (
          <tr key={element.id}>
            {/* <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  
                  <h1 className="text-gray-900 whitespace-no-wrap">{user.username}</h1>
                </div>
              </div>
            </td> */}
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
            <Link
                href={`/dashboard/user/${user.id}`}
                className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white"
              ><p className="text-gray-900 whitespace-no-wrap">
                {user.username}
              </p></Link>
              
            </td>
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">
                {element.title}
              </p>
            </td>
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">
                {element.description}
              </p>
            </td>
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">
                {element.price}
              </p>
            </td>
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-center text-sm">
              <p className="text-gray-900 whitespace-no-wrap">
                {element.stock}
              </p>
            </td>
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-center text-sm">
              {element.published ? (
                <span className="relative inline-block py-1 font-semibold text-green-900 leading-tight">
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
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
              <BtnEdit id={element.id} route={"products"} />
            </td>
            <td className="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm">
              <BtnDelete id={element.id} name={"product"}/>
            </td>
          </tr>
        ))}
      </>
    );
  } else return <></>;
};

export default ShowProduct;
