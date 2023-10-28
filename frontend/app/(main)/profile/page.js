"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import withAuth from "@/utils/auth";
import jwt from "jsonwebtoken";

const ProfileUpdatePage = () => {
  const router = useRouter();
  const [full_name, setFullName] = useState(null);
  const [date_of_birth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const access_token = localStorage.getItem("access_token");

        if (access_token) {
          const decoded = jwt.decode(access_token);

          if (decoded && decoded.user.user_id) {
            const user_id = decoded.user.user_id;

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${access_token}`;

            const response = await axios.get(
              `http://localhost:9000/api/v1/user-profile/${user_id}`
            );
            const userData = response.data;

            setFullName(userData.data.full_name);
            setDateOfBirth(userData.data.date_of_birth);
            setAddress(userData.data.address);
          }
        }
      } catch (error) {}
    };

    fetchUserProfile();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: full_name,
      dateOfBirth: date_of_birth,
      address,
    };

    try {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        const decoded = jwt.decode(access_token);

        if (decoded && decoded.user.user_id) {
          const user_id = decoded.user.user_id;

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access_token}`;

          await axios.put(
            `http://localhost:9000/api/v1/user-profile/${user_id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          toast.success("Profile updated.");
          router.push("/profile");
        }
      }
    } catch (error) {
      toast.error("An error occurred while updating your profile.");
      console.error("Error:", error);
    }
  };

  if (full_name === null || date_of_birth === null || address === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={onSubmit} className="form-style space-y-4">
        <div>
          <label htmlFor="full_name" className="font-bold">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="full_name"
            placeholder="Enter your full name"
            className="w-full bg-white border border-collapse border-solid"
            value={full_name || ""}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date_of_birth" className="font-bold">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date_of_birth"
            className="w-full bg-white border border-collapse border-solid"
            value={date_of_birth || ""}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address" className="font-bold">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter your address"
            className="w-full bg-white border border-collapse border-solid"
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default withAuth(ProfileUpdatePage);
