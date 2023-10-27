'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const ProfileUpdatePage = () => {
  const router = useRouter();

  const fixedUserId = 'd4991e9e-e681-4007-b27f-518fa0524ce8'

  const [user_id, setUserId] = useState(fixedUserId); // User ID
  const [full_name, setFullName] = useState(null);
  const [date_of_birth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState(null);

  // Function to fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user profile data based on user ID
        const response = await axios.get(`http://localhost:9000/api/v1/user-profile/${user_id}`);
        const userData = response.data;
        console.log(userData);
        // Update state variables with user profile data
        setFullName(userData.data.full_name);
        setDateOfBirth(userData.data.date_of_birth);
        setAddress(userData.data.address);
      } catch (error) {
        // Handle errors, e.g., redirect to an error page
      }
    };

    // Replace '123' with the actual user ID or fetch it from your authentication state.

    setUserId(fixedUserId);
    fetchUserProfile();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_id, // Include user ID in the update request
      fullName: full_name,
      dateOfBirth: date_of_birth,
      address,
    };

    try {
      // Send the updated user profile data to the server
      await axios.put(`http://localhost:9000/api/v1/user-profile/${user_id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Profile updated.');
      router.push('/profile/edit');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
    }
  };

  if (full_name === null || date_of_birth === null || address === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full max-w-2xl'>
      <form onSubmit={onSubmit} className='form-style space-y-4'>
        <div>
          <label htmlFor='full_name' className='font-bold'>
            Full Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='full_name'
            placeholder='Enter your full name'
            className='w-full bg-white border border-collapse border-solid'
            value={full_name || ''} // Display existing user data or an empty string
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='date_of_birth' className='font-bold'>
            Date of Birth <span className='text-red-500'>*</span>
          </label>
          <input
            type='date'
            id='date_of_birth'
            className='w-full bg-white border border-collapse border-solid'
            value={date_of_birth || ''} // Display existing user data or an empty string
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='address' className='font-bold'>
            Address <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='address'
            placeholder='Enter your address'
            className='w-full bg-white border border-collapse border-solid'
            value={address || ''} // Display existing user data or an empty string
            onChange={(e) => setAddress(e.target.value)}
          />
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

export default ProfileUpdatePage;


