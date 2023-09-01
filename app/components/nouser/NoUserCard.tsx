'use client';

import { Post } from '@prisma/client';
import Welcome from './Welcome';
import NoUserFeed from './NoUserFeed';
import Ads from './Ads';

interface NoUserCardProps {
  feed?: Post[] | null;
}

const NoUserCard: React.FC<NoUserCardProps> = ({ feed }) => {
  return (
    <div className="w-full my-10 relative gap-5 lg:gap-0 flex lg:flex-row flex-col justify-between">
      <Welcome />
      <NoUserFeed feed={feed} />
      <Ads />
    </div>
  );
};

export default NoUserCard;
