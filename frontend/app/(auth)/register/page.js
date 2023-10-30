"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!email || !username || !password || !fullName || !dateOfBirth || !address) {
      toast.error("Please fill in all fields.");
      return;
    } else {
      const data = {
        email,
        username,
        password,
        fullName,
        dateOfBirth,
        address,
      };

      await axios.post("http://localhost:9000/api/v1/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("User Registered!.");
      router.push("/login");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Binar Inventory Management
        </h1>
        <h2 className="text-xl font-bold text-center text-gray-700">
          Register Form
        </h2>
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                formSubmitted && !email && "border-red-500"
              }`}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                formSubmitted && !username && "border-red-500"
              }`}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                formSubmitted && !password && "border-red-500"
              }`}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              Fullname
            </label>
            <input
              type="text"
              placeholder="Enter fullname"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                formSubmitted && !fullName && "border-red-500"
              }`}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-semibold text-gray-800"
            >
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                formSubmitted && !dateOfBirth && "border-red-500"
              }`}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-800"
            >
              Address
            </label>
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                formSubmitted && !address && "border-red-500"
              }`}
            />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 mt-6 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover-bg-gray-600 focus:outline-none focus-bg-gray-600"
            >
              Register
            </button>
          </div>
          <div className="mt-2">
            <Link className="flex items-center justify-center" href={"/login"}>
              Go to Login Page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
