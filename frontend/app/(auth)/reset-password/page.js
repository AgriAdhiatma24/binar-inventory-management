"use client";

import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from 'next/navigation'

export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [notification, setNotification] = useState(null);
    const searchParams = useSearchParams()

  const handleInputChange = (e) => {
      const { name, value } = e.target;
    if (name === "token") setToken(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!token || !newPassword || !confirmPassword) {
      setNotification("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setNotification("Passwords do not match.");
      return;
    }
    const userId = searchParams.get('id')
    console.log(userId)
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/reset-password/${userId}`,
        { token, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setNotification("Password reset successfully.");
      } else {
        setNotification("Failed to reset the password. Please try again.");
      }
    } catch (error) {
      console.error("Failed to reset password.", error);
      setNotification("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Binar Inventory Management
        </h1>
        <h2 className="text-xl font-bold text-center text-gray-700">
          Reset Password
        </h2>
        {notification && (
          <div className="text-red-500 mb-4">{notification}</div>
        )}

        <form onSubmit={handleResetPassword} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="token"
              className="block text-sm font-semibold text-gray-800"
            >
              Token
            </label>
            <input
              type="text"
              name="token"
              value={token}
              onChange={handleInputChange}
              placeholder="Enter your token"
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus-border-gray-400 focus:ring-gray-300 focus:outline-none focus-ring focus-ring-opacity-40  ${
                formSubmitted && !token && "border-red-500"
              }`}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-gray-800"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus-border-gray-400 focus:ring-gray-300 focus:outline-none focus-ring focus-ring-opacity-40  ${
                formSubmitted && !newPassword && "border-red-500"
              }`}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus-border-gray-400 focus:ring-gray-300 focus:outline-none focus-ring focus-ring-opacity-40  ${
                formSubmitted && !confirmPassword && "border-red-500"
              }`}
            />
          </div>

          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 mt-6 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
