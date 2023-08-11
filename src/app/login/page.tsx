"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export default function LoginPage() {
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const hashedPass = await bcrypt.hash(password, 12);

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (res?.error) return setError(res.error as string);

    if (res?.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] items-center flex flex-col">
      {error && <p className="text-red-500 text-lg mb-2">{error}</p>}

      <h1 className="text-4xl font-bold mb-2">Login</h1>
      <p className="text-lg mb-2">
        Don't have an account?{" "}
        <a href="/register" className="text-indigo-500">
          Register
        </a>
      </p>
      <hr className="mb-4" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          className="bg-zinc-800 px-4 py-2 block mb-2 text-white"
        />
        <input
          type="password"
          name="password"
          minLength={6}
          placeholder="*****"
          className="bg-zinc-800 px-4 py-2 block mb-2 text-white"
        />
        <button className="bg-indigo-500 px-4 py-2 rounded-md text-white hover:bg-indigo-600 transition-colors mb-2">
          Login
        </button>
      </form>
    </div>
  );
}
