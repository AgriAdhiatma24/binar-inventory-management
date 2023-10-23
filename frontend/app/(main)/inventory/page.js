'use client';

import axios from 'axios';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const InventoryPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItemsData = async () => {
      const response = await axios.get(
        'http://localhost:9000/api/v1/product/products'
      );
      const { data } = response.data;
      setItems(data);
    };

    getItemsData();
  }, []);
  return (
    <div>
      <div>
        <h2>List of Transaction</h2>
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
              {items.map((item, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.stock_amount}</td>
                  <td>{item.image_url}</td>
                  <td>{item.category_id}</td>
                  <td>
                    <Link
                      href={`/inventory/product`}
                      className='bg-orange-500 hover:bg-orange-400 text-white py-0.5 px-1 text-sm inline-flex items-center gap-x-1 rounded mr-1'>
                      <Edit size={12} />
                      Edit
                    </Link>
                    <button className='bg-red-500 hover:bg-red-400 text-white py-0.5 px-1 text-sm inline-flex items-center gap-x-1 rounded'>
                      <Trash size={12} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href='#'>Show All</a>
      </div>
    </div>
  );
};

export default InventoryPage;
