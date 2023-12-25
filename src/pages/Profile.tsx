import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('spotifyAuthToken'));
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    console.log('ProfilePage: URL hash:', hash);

    const params = new URLSearchParams(hash.substring(1));
    const urlToken = params.get('access_token');
    console.log('ProfilePage: Extracted Token:', urlToken);

    if (urlToken) {
      localStorage.setItem('spotifyAuthToken', urlToken);
      setToken(urlToken);
      console.log('ProfilePage: save to local storage');
      window.history.replaceState({}, document.title, "/profile");
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) {
      console.log('ProfilePage: token null');
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    console.log('ProfilePage: Log Out...');
    localStorage.removeItem('spotifyAuthToken');
    navigate('/');
  };

  return (
    <div>
      <h1 className='text-white'>{token ? 'Logged in!' : 'Please log in.'}</h1>
      {token && (
        <button className='text-white' onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
