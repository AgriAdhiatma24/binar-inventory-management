'use client';

import axios from 'axios';
import { Edit, Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CategoriesPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          'http://localhost:9000/api/v1/product-category'
        );
        const { data } = response.data;
        setItems(data);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <div className='flex justify-between items-start'>
        <h2 className='text-2xl font-bold mb-4'>All Categories</h2>
        <Link
          href='inventory/product/add'
          className='bg-[var(--color-primary)] text-white flex items-center rounded-xl px-4 py-2 gap-x-2'>
          <Plus size={20} />
          Add Categories
        </Link>
      </div>
      <div className='w-full bg-white rounded-lg p-8'>
        <table className='w-full'>
          <thead>
            <tr className='h-12 text-left'>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock Amount</th>
              <th>Image</th>
              <th>Category</th>
              <th className='w-30'>Action</th>
            </tr>
          </thead>
          <tbody id='table-body'>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.stock_amount}</td>
                  <td>{item.image_url}</td>
                  <td>{item.category_id}</td>
                  <td>
                    <Link
                      href={`/categories/edit/${item.id}`}
                      className='bg-orange-500 hover:bg-orange-400 text-white py-0.5 px-2 text-sm inline-flex items-center gap-x-1 rounded mr-1'>
                      <Edit size={12} />
                      Edit
                    </Link>
                    <button className='bg-red-500 hover:bg-red-400 text-white py-0.5 px-2 text-sm inline-flex items-center gap-x-1 rounded'>
                      <Trash size={12} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <a href='#'>Show All</a>
    </div>
  );
};

export default CategoriesPage;
