"use client";

import ShowCategory from "@/app/components/server/showCategory";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TableCategories({ data }) {
  //console.log(typeof data);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClickAdd = function () {
    router.push("/dashboard/categories/add");
  };

  return (
    <>
      <div className=" bg-white p-8 w-full dark:bg-gray-900 ">
        <div className="flex flex-col items-center w-full my-2 overflow-x-auto ">
          <div className="">
            <div className="flex flex-col items-start mb-3">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                onClick={handleClickAdd}
              >
                Add
              </button>
            </div>

            <div className="inline-block shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal ">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[300px]">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Edit
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>{<ShowCategory categories={data} />}</tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 10 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
