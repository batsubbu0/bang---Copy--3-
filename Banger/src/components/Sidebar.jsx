import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { logout } from '../firbase/firbase';

const Sidebar = ({ username, onSearch }) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const generateRandomColor = () => {
      const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300', '#DAF7A6'];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    setBgColor(generateRandomColor());
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log('Error during logout:', error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='w-[20%] h-full p-4 flex flex-col gap-6 text-white bg-[#571012]'>
      <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
        <img className='w-6' src={assets.home_icon} alt="Home" />
        <p className='font-bold text-lg'>Home</p>
      </div>

      <div className='flex items-center gap-3 cursor-pointer'>
        <img className='w-6' src={assets.search_icon} alt="Search" />
        <p className='font-bold text-lg'>Search</p>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search songs, albums..."
        className="p-3 m-2 rounded bg-gray-700 text-white text-sm focus:outline-none focus:ring focus:ring-green-500"
        value={searchQuery}
        onChange={handleSearch}
      />

      <div className='bg-[#1e1e1e] p-4 rounded-lg flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img className='w-8' src={assets.stack_icon} alt="Library" />
          <p className='font-semibold'>Your Library</p>
        </div>
        <div
          className='flex items-center justify-center rounded-full text-white font-bold w-10 h-10'
          style={{ backgroundColor: bgColor }}>
          {username[0].toUpperCase()}
        </div>
      </div>

      {/* Logout Button */}
      <div className='bg-red-500 p-3 rounded-lg mt-auto cursor-pointer' onClick={handleLogout}>
        <p className='text-center font-semibold text-white'>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
