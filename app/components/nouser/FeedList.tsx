'use client';

interface FeedListProps {
  id: string;
  profilePic: string | null;
  userId: string;
  description: string | null;
  location: string | null;
  name: string | null;
  feedPic: string | null;
  hashtag: string | null;
  likes: any;
  comments: any;
}

const FeedList: React.FC<FeedListProps> = ({
  id,
  profilePic,
  userId,
  description,
  location,
  name,
  feedPic,
  hashtag,
  likes,
  comments,
}) => {
  console.log(description);
  return (
    <div>
      <p>{description}</p>
    </div>
  );
};

export default FeedList;
