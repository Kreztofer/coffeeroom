'use client';

import { Post } from '@prisma/client';
import FeedList from './FeedList';

interface NoUserFeedProps {
  feed?: Post[] | null;
}
const NoUserFeed: React.FC<NoUserFeedProps> = ({ feed }) => {
  return (
    <div className="w-[48%] flex flex-col gap-3">
      {feed?.map((item) => (
        <FeedList
          key={item.id}
          id={item.id}
          profilePic={item.creatorsProfileImage}
          userId={item.userId}
          description={item.description}
          location={item.location}
          name={item.name}
          feedPic={item.postImage}
          hashtag={item.hashtag}
          likes={item.likes}
          comments={item.comments}
        />
      ))}
    </div>
  );
};

export default NoUserFeed;
