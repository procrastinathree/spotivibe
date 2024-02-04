import Playlists from '@/components/profile/Playlists';
import Taste from '@/components/profile/Taste';
import TopArtistsList from '@/components/profile/TopArtists';
import TopSongsList from '@/components/profile/TopSongs';

import { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const ProfilePage: FC = () => {
  const [cookies, setCookie] = useCookies(["spotifyAuthToken"])
  const [token, setToken] = useState<string | null>(cookies.spotifyAuthToken as string);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    console.log('ProfilePage: URL hash:', hash);

    const params = new URLSearchParams(hash.substring(1));
    const urlToken = params.get('access_token');
    console.log('ProfilePage: Extracted Token:', urlToken);

    if (urlToken) {
      const expires = new Date(new Date().getTime() + 50 * 60 * 1000);
      setCookie('spotifyAuthToken', urlToken, { expires: expires });
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
      <div className='flex flex-col gap-16 xl:flex-row'>
        <TopSongsList />
        <TopArtistsList />
      </div>
      <Taste />
      <Playlists />
    </div>
  );
};

export default ProfilePage;
