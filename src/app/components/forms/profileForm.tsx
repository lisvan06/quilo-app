import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

import UserService from "@/app/api/user/service";

export default function ProfileForm() {
  const { data: session, status, update } = useSession();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  if (status == "authenticated") {
    const handleClick = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      data.ownerId = session?.user?.id as string;

      try {
        const newU = new UserService();
        const editedUser = await newU.updateUser(data, data.ownerId);

        if (editedUser) {
          setError("");
          setNotice("Data Saved");

          // updateSession(editedUser);
        } else {
          setError("Error saving data");
        }
      } catch (error) {
        console.log("error in request", error);
        setError("Error saving data");
      }
    };

    return (
      <>
        <form
          id="profileForm"
          method="post"
          onSubmit={handleClick}
          className="bg-white dark:bg-gray-900 p-4 rounded-md flex flex-col justify-center w-auto items-center"
        >
          <input
            type="text"
            name="id"
            placeholder="Some Title"
            className="bg-zinc-800 px-4 py-2 mb-2 text-white hidden"
            defaultValue={session?.user?.id}
          />
          <input
            type="textarea"
            name="enterprise"
            placeholder="My Enterprise"
            className="bg-zinc-500 px-4 py-2 block mb-2 rounded-md"
            required
            defaultValue={session?.user?.enterprise}
          />
          <input
            type="text"
            name="address"
            placeholder="My Address"
            className="bg-zinc-500 px-4 py-2 block mb-2 rounded-md"
            required
            defaultValue={session?.user?.address}
          />
          <button className="w-1/2 bg-indigo-500 py-2 px-4 mt-2 rounded-md hover:bg-indigo-600 transition-colors">
            Save
          </button>

          {error && <p className="text-red-500 text-md m-2">{error}</p>}
          {notice && <p className="text-green-500 text-md m-2">{notice}</p>}
        </form>
      </>
    );
  }
}
