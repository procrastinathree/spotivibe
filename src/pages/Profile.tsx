import TopSongsList from '@/components/profile/TopSongs';
import TopArtistsList from '@/components/profile/TopArtists';
import Taste from '@/components/profile/Taste';

import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: FC = () => {
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


  return (
    <div className="flex flex-col gap-16">
      <div className='flex gap-16'>
        <TopSongsList />
        <TopArtistsList />
      </div>
      <Taste />
    </div>
  );
};

export default ProfilePage;
