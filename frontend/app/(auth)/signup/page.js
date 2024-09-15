"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function SignUp() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    // const success = await signUp(formData);
    // if (success) {
    //   alert("Registration successful");
    //   router.push("/signin");
    // }
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <AuthForm
        onSubmit={handleSubmit}
        error={"Some Error while fetching"}
        buttonText="Register"
        isSignUp
      />
    </>
  );
}
