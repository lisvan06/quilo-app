"use client";

import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const signUpResponse = await axios.post("/api/auth/signup", {
        email,
        password,
      });

      if (signUpResponse.status === 200) {
        const res = await signIn("credentials", {
          email: email,
          password: password as string,
          redirect: false,
        });

        if (res?.ok) {
          router.push("/dashboard/profile");
          router.refresh();
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] items-center flex flex-col">
      {error && <p className="text-red-500 text-lg mb-2">{error}</p>}

      <h1 className="text-4xl font-bold mb-2">Register</h1>
      <p className="text-lg mb-2">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-500">
          Login
        </a>
      </p>
      <hr className="mb-4" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          className="bg-zinc-800 px-4 py-2 block mb-2 text-black"
        />
        <input
          type="password"
          name="password"
          minLength={6}
          placeholder="*****"
          className="bg-zinc-800 px-4 py-2 block mb-2 text-black"
        />
        <button className="bg-indigo-500 px-4 py-2 rounded-md text-white hover:bg-indigo-600 transition-colors mb-2">
          Register
        </button>
      </form>
    </div>
  );
}
