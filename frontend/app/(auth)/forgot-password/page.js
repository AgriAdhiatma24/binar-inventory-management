"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!email) {
      setNotification("Please enter your email.");
      return;
    }

    try {
        const response = await axios.post(
          "http://localhost:9000/api/v1/reset-password/forgot-password",
          { email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        if (response.status === 200) {
          console.log(response.data.data)
          if (response.data && response.data.data.user_id) {
            router.push(`/reset-password?id=${response.data.data.user_id}`);
          } else {
            setNotification("User ID not found in the response. Please try again.");
          }
        } else {
          setNotification("Failed to process your request. Please try again.");
        }
      } catch (error) {
        console.error("Failed to request reset password.", error);
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
          Forgot Password
        </h2>
        {notification && (
          <div className="text-red-500 mb-4">{notification}</div>
        )}

        <form onSubmit={handleForgotPassword} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus-border-gray-400 focus:ring-gray-300 focus:outline-none focus-ring focus-ring-opacity-40  ${
                formSubmitted && !email && "border-red-500"
              }`}
            />
            {formSubmitted && !email && (
              <p className="text-red-500 text-xs">Email is required.</p>
            )}
          </div>

          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 mt-6 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
