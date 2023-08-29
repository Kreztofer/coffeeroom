'use client';

import { Post } from '@prisma/client';
import Welcome from './Welcome';
import NoUserFeed from './NoUserFeed';
import Ads from './Ads';

interface NoUserCardProps {
  feed?: Post[] | null;
}

const NoUserCard: React.FC<NoUserCardProps> = ({ feed }) => {
  console.log(feed);
  return (
    <div className="w-full my-10 relative flex justify-between">
      <Welcome />
      <NoUserFeed feed={feed} />
      <Ads />
    </div>
  );
};

export default NoUserCard;
