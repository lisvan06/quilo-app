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
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    try {
      const signUpResponse = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });

      if (signUpResponse.status === 200) {
        //If user has been registered correctly
        const res = await signIn("credentials", {
          //Sign in the user
          email: email,
          password: password as string,
          redirect: false,
        });

        if (res?.ok) {
          //If sign in was successful
          // redirect("/dashboard/profile");
          router.refresh();
          return router.push("/dashboard/profile");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] items-center flex flex-col bg-[url('/tiendaonline-65.jpg')] bg-fixed bg-left-top bg-cover">
      
      {error && <p className="text-red-500 text-lg mb-2">{error}</p>}

      <h1 className="text-4xl font-bold mb-2">Register</h1>
      <p className="text-lg mb-2">
        Already have an account?{" "}
        <a href="/login" className="text-cyan-400">
          Login
        </a>
      </p>
      <hr className="mb-4" />
      <form onSubmit={handleSubmit} className="rounded-md p-4 bg-gray-900">
        <input
          type="text"
          name="username"
          placeholder="john"
          className="bg-zinc-800 px-4 py-2 block mb-2 rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          className="bg-zinc-800 px-4 py-2 block mb-2 rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          minLength={6}
          placeholder="*****"
          className="bg-zinc-800 px-4 py-2 block mb-2 rounded-md"
          required
        />
        <div className="flex place-content-center">
          <button className="bg-indigo-500 px-6 py-2 mt-2 rounded-md text-white hover:bg-indigo-600 transition-colors">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
