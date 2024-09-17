import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = ({ searchQuery }) => {
  const { songsData, albumsData } = useContext(PlayerContext);
  const [filteredSongs, setFilteredSongs] = useState(songsData);
  const [filteredAlbums, setFilteredAlbums] = useState(albumsData);

  useEffect(() => {
    if (searchQuery) {
      const lowerSearchQuery = searchQuery.toLowerCase();
      const filteredS = songsData.filter((song) => song.name.toLowerCase().includes(lowerSearchQuery));
      const filteredA = albumsData.filter((album) => album.name.toLowerCase().includes(lowerSearchQuery));
      
      setFilteredSongs(filteredS);
      setFilteredAlbums(filteredA);
    } else {
      setFilteredSongs(songsData);
      setFilteredAlbums(albumsData);
    }
  }, [searchQuery, songsData, albumsData]);

  return (
    <>
      <Navbar />

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto gap-4'>
          {filteredAlbums.map((item, index) => (
            <AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hits</h1>
        <div className='flex overflow-auto gap-4'>
          {filteredSongs.map((item, index) => (
            <SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
