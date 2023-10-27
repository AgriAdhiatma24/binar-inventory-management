'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const [categories, setCategories] = useState([]);

  const { productId } = params;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        'http://localhost:9000/api/v1/product-category'
      );
      const { data } = response.data;
      setCategories(data);
      setCategory(data[0].id);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const getProductData = async () => {
      const response = await axios.get(
        `http://localhost:9000/api/v1/product/${productId}`
      );
      const { name, price, stock_amount, image_url, category_id } =
        response.data.data;

      setName(name);
      setPrice(price);
      setStock(stock_amount);
      setImage(image_url);
      setCategory(category_id);
    };
    getProductData();
  }, [productId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        price,
        stock_amount: stock,
        image_url: image,
        category_id: category,
      };
      console.log(data);
      await axios.put(
        `http://localhost:9000/api/v1/product/${productId}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Product edited.');
      router.push('/');
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className='w-full max-w-2xl'>
      <form onSubmit={onSubmit} className='form-style space-y-4'>
        <div>
          <label htmlFor='' className='font-bold'>
            Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            placeholder='Enter product name'
            className='w-full bg-white border border-collapse border-solid'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='' className='font-bold'>
            Price <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='Enter product price'
            className='w-full bg-white border border-collapse border-solid'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='' className='font-bold'>
            Stock Amount <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='Enter product stock'
            className='w-full bg-white border border-collapse border-solid'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='' className='font-bold'>
            Image <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            placeholder='Enter image url'
            className='w-full bg-white border border-collapse border-solid'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {/* <input
        type='file'
        className='w-full bg-white border border-collapse border-solid file:bg-[var(--color-primary)] file:text-white file:border-none file:p-2 rounded-xl'
      /> */}
        </div>
        <div>
          <label htmlFor='' className='font-bold'>
            Category <span className='text-red-500'>*</span>
          </label>
          <select
            type='text'
            className='w-full bg-white border border-collapse border-solid'
            onChange={(e) => setCategory(e.target.value)}>
            {categories.map((item) => (
              <option value={item.id} selected={item.id === category}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type='submit'
          className='bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg'>
          Save
        </button>
      </form>
    </div>
  );
};

export default withAuth(EditProductPage);
