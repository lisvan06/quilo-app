import TableProducts from "@/app/components/client/tableProducts";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";

export async function getData(user) {
  try {
    const role = user.role;
    // role = "ADMIN";
    const res =  (role === "USER") ? await fetch(`${process.env.BASE_URL}/api/product/search?ownerId=${user.id}`, {
      cache: "no-store"
    }) : await fetch(`${process.env.BASE_URL}/api/product`, {
      cache: "no-store"
    });
    const data = await res.json();

    return data;
  } catch (error) {}
}

export default async function productsPage() {
  const session = await getServerSession(authOptions);
  try {
    const data = await getData(session.user);
    return (
      <>
        <TableProducts data={data}></TableProducts>
      </>
    );
  } catch (error) {}
}
