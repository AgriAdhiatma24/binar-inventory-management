"use client";

import Modal from "@/components/modal";
import axios from "axios";
import {
  DollarSign,
  Edit,
  Folder,
  Package,
  PackageX,
  Plus,
  Trash,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import withAuth from "@/utils/auth";

function Home() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [totalProducts, setTotalProducts] = useState("");
  const [totalStoreValue, setTotalStoreValue] = useState("");
  const [outOfStockItem, setOutOfStockItem] = useState("");
  const [categoryCount, setCategoryCount] = useState("");

  const getItemsData = async () => {
    const response = await axios.get(
      "http://localhost:9000/api/v1/product/products"
    );
    const { data } = response.data;
    setItems(data);
  };

  const getTotalProducts = async () => {
    const response = await axios.get(
      "http://localhost:9000/api/v1/product/products/count"
    );
    const data = response.data.data;
    setTotalProducts(data);
  };

  const getTotalValue = async () => {
    const response = await axios.get(
      "http://localhost:9000/api/v1/product/products/store-values"
    );
    const data = response.data.data;
    console.log(data);
    setTotalStoreValue(data);
  };

  const getOutOfStockItems = async () => {
    const response = await axios.get(
      "http://localhost:9000/api/v1/product/products/out-of-stock"
    );
    const data = response.data.data.outOfStockItemsCount;
    setOutOfStockItem(data);
  };

  const getCategoryCount = async () => {
    const response = await axios.get(
      "http://localhost:9000/api/v1/product-category/category/count"
    );
    const data = response.data.data;
    console.log(data);
    setCategoryCount(data);
  };

  useEffect(() => {
    getItemsData();
    getTotalProducts();
    getTotalValue();
    getOutOfStockItems();
    getCategoryCount();
  }, []);

  const onClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  const onConfirm = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/v1/product/${deleteId}`
      );
      setTotalProducts((prevTotalProducts) => prevTotalProducts - 1);
      getItemsData();
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      onClose();
    }
  };

  return (
    <main>
      <div className="insight">
        <div className="balance" id="balance">
          <div className="bg-[var(--color-primary)] inline-flex items-center justify-center p-2 rounded-full">
            <Package size={28} className="text-white" />
          </div>
          <div className="info" id="info-balance">
            <h3>Total Products</h3>
            <h1>{totalProducts}</h1>
          </div>
        </div>
        <div className="income" id="income">
          <div className="bg-[var(--color-success)] inline-flex items-center justify-center p-2 rounded-full">
            <DollarSign size={28} className="text-white" />
          </div>
          <div className="info" id="info-income">
            <h3>Total Value</h3>
            <h1>Rp.{totalStoreValue}</h1>
          </div>
        </div>
        <div className="expenses" id="expenses">
          <div className="bg-[var(--color-danger)] inline-flex items-center justify-center p-2 rounded-full">
            <PackageX size={28} className="text-white" />
          </div>
          <div className="info" id="info-expenses">
            <h3>Out of Stock</h3>
            <h1>{outOfStockItem}</h1>
          </div>
        </div>
        <div className="expenses" id="expenses">
          <div className="bg-[var(--color-warning)] inline-flex items-center justify-center p-2 rounded-full">
            <Folder size={28} className="text-white" />
          </div>
          <div className="info" id="info-expenses">
            <h3>All Categories</h3>
            <h1>5</h1>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold mb-4">Inventory Items</h2>
          <Link
            href="/product/add"
            className="bg-[var(--color-primary)] text-white flex items-center rounded-xl px-4 py-2 gap-x-2"
          >
            <Plus size={20} />
            Add Product
          </Link>
        </div>
        <div className="w-full bg-white rounded-3xl p-8">
          <table className="w-full">
            <thead>
              <tr className="h-12 text-left">
                <th>No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock Amount</th>
                <th>Image</th>
                <th>Category</th>
                <th className="w-30">Action</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {items.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.stock_amount}</td>
                  <td>{item.image_url}</td>
                  <td>{item.category_id}</td>
                  <td>
                    <Link
                      href={`/product/edit/${item.id}`}
                      className="bg-[var(--color-warning)] hover:opacity-75 text-white py-0.5 px-2 text-sm inline-flex items-center gap-x-1 rounded mr-1"
                    >
                      <Edit size={12} />
                      Edit
                    </Link>
                    <button
                      onClick={() => onClick(item.id)}
                      className="bg-[var(--color-danger)] hover:opacity-75 text-white py-0.5 px-2 text-sm inline-flex items-center gap-x-1 rounded"
                    >
                      <Trash size={12} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <a href='#'>Show All</a> */}
      </div>
      <Modal isOpen={showModal} onClose={onClose} onConfirm={onConfirm} />
    </main>
  );
}

export default withAuth(Home);
