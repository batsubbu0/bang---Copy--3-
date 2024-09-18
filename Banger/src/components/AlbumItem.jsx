import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/album/${id}`)} className='min-w-[140px] p-2 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img className='rounded w-28] h-28' src={image} alt={name} />
      <p className='font-bold mt-2 text-sm'>{name}</p>
      <p className='text-slate-200 text-xs'>{desc}</p>
    </div>
  );
};

export default AlbumItem;
