'use client';

import axios from 'axios';
import {
  DollarSign,
  Edit,
  Folder,
  Package,
  PackageX,
  Plus,
  Trash,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
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
    <main>
      {/* <div class='month-dropdown'>
        <select name='month' id='month'>
          <option value='current'>Current Month</option>
          <option value='January'>January</option>
          <option value='February'>February</option>
          <option value='March'>March</option>
          <option value='April'>April</option>
          <option value='May'>May</option>
          <option value='June'>June</option>
          <option value='July'>July</option>
          <option value='August'>August</option>
          <option value='September'>September</option>
          <option value='October'>October</option>
          <option value='November'>November</option>
          <option value='December'>December</option>
        </select>
      </div> */}

      <div class='insight'>
        <div class='balance' id='balance'>
          <div className='bg-[var(--color-primary)] inline-flex items-center justify-center p-2 rounded-full'>
            <Package size={28} className='text-white' />
          </div>
          <div class='info' id='info-balance'>
            <h3>Total Products</h3>
            <h1>84</h1>
          </div>
        </div>
        <div class='income' id='income'>
          <div className='bg-[var(--color-success)] inline-flex items-center justify-center p-2 rounded-full'>
            <DollarSign size={28} className='text-white' />
          </div>
          <div class='info' id='info-income'>
            <h3>Total Value</h3>
            <h1>Rp.10.000</h1>
          </div>
        </div>
        <div class='expenses' id='expenses'>
          <div className='bg-[var(--color-danger)] inline-flex items-center justify-center p-2 rounded-full'>
            <PackageX size={28} className='text-white' />
          </div>
          <div class='info' id='info-expenses'>
            <h3>Out of Stock</h3>
            <h1>2</h1>
          </div>
        </div>
        <div class='expenses' id='expenses'>
          <div className='bg-[var(--color-warning)] inline-flex items-center justify-center p-2 rounded-full'>
            <Folder size={28} className='text-white' />
          </div>
          <div class='info' id='info-expenses'>
            <h3>All Categories</h3>
            <h1>5</h1>
          </div>
        </div>
      </div>

      <div className='mt-16'>
        <div className='flex justify-between items-start'>
          <h2 className='text-2xl font-bold mb-4'>Inventory Items</h2>
          <Link
            href='inventory/product/add'
            className='bg-[var(--color-primary)] text-white flex items-center rounded-xl px-4 py-2 gap-x-2'>
            <Plus size={20} />
            Add Product
          </Link>
        </div>
        <div className='w-full bg-white rounded-3xl p-8'>
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
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.stock_amount}</td>
                  <td>{item.image_url}</td>
                  <td>{item.category_id}</td>
                  <td>
                    <Link
                      href={`/inventory/product`}
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
              ))}
            </tbody>
          </table>
        </div>
        {/* <a href='#'>Show All</a> */}
      </div>
    </main>
  );
}
