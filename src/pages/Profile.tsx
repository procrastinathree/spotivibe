import TopSongsList from '@/components/profile/TopSongs';
import TopArtistsList from '@/components/profile/TopArtists';
import Taste from '@/components/profile/Taste';

import { FC } from 'react';

const ProfilePage: FC = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className='flex flex-col gap-16 xl:flex-row'>
        <TopSongsList />
        <TopArtistsList />
      </div>
      <Taste />
    </div>
  );
};

export default ProfilePage;
