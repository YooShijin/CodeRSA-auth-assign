import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome</h1>
      <div className="space-y-4">
        <Link
          href="/signin"
          className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="block w-full text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
}
