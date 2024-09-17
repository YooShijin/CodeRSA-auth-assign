import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgetPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/forget-password`,
        { email, newPassword }
      );
      toast.success("Password updated successfully!");
      setEmail("");
      setNewPassword("");
    } catch (error) {
      toast.error("Error updating password. Please try again.");
      setEmail("");
      setNewPassword("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              New Password:
            </label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-gray-500 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordModal;
