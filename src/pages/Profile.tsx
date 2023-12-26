import TopSongsList from '@/components/profile/TopSongs';
import TopArtistsList from '@/components/profile/TopArtists';

import { FC } from 'react';

const ProfilePage: FC = () => {

  return (
    <div className='flex gap-16'>
      <TopArtistsList />
      <TopSongsList />
    </div>
  );
};

export default ProfilePage;
