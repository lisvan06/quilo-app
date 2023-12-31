import BtnDelete from "../client/btnDelete";
import BtnEdit from "../client/btnEdit";

const ShowCategory = ({ categories }) => {
  const data = categories;

  // console.log("Username... ", products.username);
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((element) => (
          <tr key={element.id}>
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{element.name}</p>
            </td>
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
              <BtnEdit id={element.id} route={"categories"} />
            </td>
            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
              <BtnDelete id={element.id} name={"category"} />
            </td>
          </tr>
        ))}
      </>
    );
  } else return <></>;
};

export default ShowCategory;
