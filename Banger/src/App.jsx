import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { auth } from './firbase/firbase';
import Login from './pages/Login';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setUsername(user.displayName || user.email[0].toUpperCase());
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="h-screen bg-black">
      {isLoggedIn && songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            {/* Pass the username and search query handler */}
            <Sidebar username={username} onSearch={setSearchQuery} />
            <Routes>
              {/* Pass the search query to Display */}
              <Route path="/*" element={<Display searchQuery={searchQuery} />} />
            </Routes>
          </div>
          <Player />
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
      <audio ref={audioRef} src={track ? track.file : ''} preload="auto"></audio>
    </div>
  );
};

export default App;
