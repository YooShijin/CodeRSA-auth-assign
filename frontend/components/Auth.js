"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { useRouter } from "next/navigation";
import ForgetPasswordModal from "./ForgotPasswordMode";
useRouter;

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const Auth = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confPassword, setConfPassword] = useState("");
  const router = useRouter();
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/${type}`,
        postInputs
      );

      if (type == "signup") {
        toast.success("Account created successfully!");
        router.push("/signin");
      } else {
        toast.success("Logged in Successfully!");
        console.log(response);
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        router.push("/home");
      }
    } catch (e) {
      console.log(e);
      toast.error("Error while signing up");
    }
  }

  return (
    <div className=" flex justify-center flex-col">
      <div className="flex justify-center">
        <form>
          <div className="text-4xl font-extrabold pb-2">
            {type === "signin" ? "SIGN IN" : "SIGN UP"} FORM
            <br />
          </div>
          <div className="text-slate-500 mt-3 mb-3">
            {type === "signin"
              ? "Dont have an account:?"
              : "Already have an account?"}
            <Link
              className="pl-2 underline"
              href={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
          {type === "signup" ? (
            <LabelledInput
              label="Username"
              placeholder="Username"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
          ) : null}
          <LabelledInput
            type="email"
            label="Email"
            placeholder="email"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              });
            }}
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
          {type === "signup" ? (
            <LabelledInput
              label="ConfPassword"
              type="password"
              placeholder="confirm password"
              onChange={(e) => {
                setConfPassword(e.target.value);
              }}
            />
          ) : null}
          {type === "signin" ? (
            <div className="text-slate-500 mt-3 mb-3">
              <button className="pl-2 underline" onClick={openModal}>
                Forgot Password:?
              </button>
            </div>
          ) : null}

          <button
            onClick={() => {
              if (type === "signup" && confPassword != postInputs.password) {
                alert("Passwords do not match");
                setConfPassword("");
                return;
              }
              sendRequest();
            }}
            type="submit"
            className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <ForgetPasswordModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

function LabelledInput({ label, placeholder, onChange, type }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
