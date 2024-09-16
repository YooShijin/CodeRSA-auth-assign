"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome,</h1>
      <p className="mb-4">You are now logged in.</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/");
        }}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </>
  );
}
