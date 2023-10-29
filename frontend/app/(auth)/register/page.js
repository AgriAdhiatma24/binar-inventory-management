'use client';
import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

export default function Register() {
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dateOfBirth: '',
    address: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const routeToLogin = () => {
    window.location.href = '/login';
  };

  const togglePasswordVisibility = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  const fetchRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    }

    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required';
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    }

    if (formData.confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confirm your password';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.fullName.trim() === '') {
      newErrors.fullName = 'Full Name is required';
    }

    if (formData.dateOfBirth.trim() === '') {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }

    if (formData.address.trim() === '') {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:9000/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          window.location.href = '/login';
          const resp = await response.json();
          console.log({ resp });
        } else {
          setNotification('Failed to register');
        }
      } catch (error) {
        console.error('Failed to fetch user data.', error);
      }
    }
  };

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-bold text-center text-gray-700'>
          Binar Inventory Management
        </h1>
        <h2 className='text-xl font-bold text-center text-gray-700'>Register Form</h2>
        {notification && <div className='text-red-500 mb-4'>{notification}</div>}

        <form onSubmit={fetchRegister} className='mt-6'>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-semibold text-gray-800'>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email' 
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Enter Email'
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor='username' className='block text-sm font-semibold text-gray-800'>
              Username
            </label>
            <input
              id='username'
              name='username'
              type='text'
              value={formData.username}
              onChange={handleInputChange}
              placeholder='Enter Username'
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            {errors.username && <p className='text-red-500 text-xs'>{errors.username}</p>}
          </div>

          <div className='mb-2'>
            <label htmlFor='password' className='block text-sm font-semibold text-gray-800'>
              Password
            </label>
            <div className='mb-4 flex'>
              <input
                id='password'
                name='password'
                type={type}
                value={formData.password}
                placeholder='Enter Password'
                onChange={handleInputChange}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              <span className='flex items-center justify-center mt-1' onClick={togglePasswordVisibility}>
                <Icon className='absolute mr-10' icon={icon} size={15} />
              </span>
            </div>

            {errors.password && <p className='text-red-500 text-xs'>{errors.password}</p>}
          </div>

          <div className='mb-2'>
            <label htmlFor='confirmPassword' className='block text-sm font-semibold text-gray-800'>
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={formData.confirmPassword}
              placeholder='Confirm Password'
              onChange={handleInputChange}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
            />
            {errors.confirmPassword && <p className='text-red-500 text-xs'>{errors.confirmPassword}</p>}
          </div>

          <div className='mb-2'>
            <label htmlFor='fullName' className='block text-sm font-semibold text-gray-800'>
              Full Name
            </label>
            <input
              id='fullName'
              name='fullName'
              type='text'
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder='Enter Full Name'
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                errors.fullName ? 'border-red-500' : ''
              }`}
            />
            {errors.fullName && <p className='text-red-500 text-xs'>{errors.fullName}</p>}
          </div>

          
          <div className='mb-2'>
            <label htmlFor='dateOfBirth' className='block text-sm font-semibold text-gray-800'>
              Date of Birth
            </label>
            <input
              id='dateOfBirth'
              name='dateOfBirth'
              type='date' 
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              placeholder='Select Date of Birth'
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                errors.dateOfBirth ? 'border-red-500' : ''
              }`}
            />
            {errors.dateOfBirth && <p className='text-red-500 text-xs'>{errors.dateOfBirth}</p>}
          </div>



          <div className='mb-2'>
            <label htmlFor='address' className='block text-sm font-semibold text-gray-800'>
              Address
            </label>
            <input
              id='address'
              name='address'
              type='text'
              value={formData.address}
              onChange={handleInputChange}
              placeholder='Enter Address'
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40  ${
                errors.address ? 'border-red-500' : ''
              }`}
            />
            {errors.address && <p className='text-red-500 text-xs'>{errors.address}</p>}
          </div>

          <div className='flex justify-between items-center'>
            <h2 className='mb-2 text-sm pt-2'>
              Already have an account?
              <span onClick={routeToLogin} className='text-lime-600 cursor-pointer ml-1 font-bold'>
                Sign in
              </span>
            </h2>
          </div>

          <div className='mt-2'>
            <button
              className='w-full px-4 mt-6 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover-bg-gray-600 focus:outline-none focus-bg-gray-600'
              type='submit'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


