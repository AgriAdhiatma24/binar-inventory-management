'use client';
import React, { useEffect, useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [resp, setResp] = useState({});

  const handleRegister = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email,
      password,
      fullname,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:9000/', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setResp(result);
        navigate('/sign-in');
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-bold text-center text-gray-700'>
          Binar Inventory Management
        </h1>
        <h2 className='text-xl font-bold text-center text-gray-700'>
          Register Form
        </h2>
        <form className='mt-6'>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-semibold text-gray-800'>
              Masukan email anda
            </label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='password'
              className='block text-sm font-semibold text-gray-800'>
              Masukan Password Anda
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='text'
              className='block text-sm font-semibold text-gray-800'>
              Full Name
            </label>
            <input
              type='text'
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mt-2'>
            <button
              onClick={handleRegister}
              className='w-full px-4 mt-6 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Daftar
            </button>
            <pre>{JSON.stringify(resp, null, 2)}</pre>
          </div>
        </form>
      </div>
    </div>
  );
}