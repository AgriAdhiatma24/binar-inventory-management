"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import withAuth from "@/utils/auth";

const AddProductPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
    };
    console.log(data);
    await axios.post("http://localhost:9000/api/v1/product-category/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Product added.");
    router.push("/categories");
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={onSubmit} className="form-style space-y-4">
        <div>
          <label htmlFor="" className="font-bold">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter category name"
            className="w-full bg-white border border-collapse border-solid"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

export default withAuth(AddProductPage);
