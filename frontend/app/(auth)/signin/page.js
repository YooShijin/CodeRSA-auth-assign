"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    // const success = await signIn(formData);
    // if (success) {
    //   router.push("/dashboard");
    // }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
      <AuthForm onSubmit={handleSubmit} error={"Some Error while fetching"} buttonText="Sign In" />
      <p className="mt-4 text-center">
        <Link href="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </Link>
      </p>
    </>
  );
}
