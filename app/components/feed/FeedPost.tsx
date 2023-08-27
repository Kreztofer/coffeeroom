'use client';

import Image from 'next/image';
import {
  AiOutlineUserAdd,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineUserDelete,
} from 'react-icons/ai';
import { TbMessageCircle2 } from 'react-icons/tb';
import { BsSend } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAddFriends from '@/app/hooks/useAddFriends';
import { useState } from 'react';
import useCommentsModal from '@/app/hooks/useCommentsModal';

interface FeedPostProps {
  id: string;
  profilePic: string | null;
  userId: string;
  description: string;
  currentUserId: string;
  location: string | null;
  name: string | null;
  feedPic: string | null;
  hashtag: string;
  friends?: any;
  likes: any;
  toggle?: string;
  comments: any;
}

const FeedPost: React.FC<FeedPostProps> = ({
  id,
  profilePic,
  userId,
  description,
  location,
  name,
  feedPic,
  hashtag,
  friends,
  currentUserId,
  likes,
  toggle,
  comments,
}) => {
  const router = useRouter();
  const liked = Boolean(likes[currentUserId]);
  const likecount = Object.keys(likes).length;
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [count, setCount] = useState(likecount);
  const commentsModal = useCommentsModal();

  const { patch, checked } = useAddFriends({
    userId: currentUserId,
    friendId: userId,
    friends,
  });

  const patchLike = async () => {
    const data = {
      userId: currentUserId,
      postId: id,
    };
    await axios
      .patch('/api/likepost', data)
      .catch((error: any) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      })
      .finally(() => {
        setIsLiked((prev) => !prev);
        if (isLiked === false) {
          setCount(count + 1);
        } else if (isLiked === true) {
          if (likecount > 0) {
            setCount(count - 1);
          } else {
            setCount(0);
          }
        }
        router.refresh();
      });
  };

  const handleHashtag = (hash: string) => {
    if (hash) {
      const firstChar = hash.charAt(0);
      if (firstChar === '#') {
        return hash;
      } else {
        return `#${hash}`;
      }
    }
    return '';
  };

  const handleProfileChange = (e: any, id: any) => {
    e.stopPropagation();
    router.push(`/profilepage/${id}`);
  };

  const handleGetPostId = () => {
    commentsModal.onPost(id);
    commentsModal.onOpen();
    document.body.style.overflowY = 'hidden';
  };
  return (
    <div className="w-full cursor-pointer bg-white rounded-md shadow-md">
      <div className="w-[95%] flex flex-col gap-3 mx-auto my-5">
        <div
          onClick={() => router.push(`/status/${id}`)}
          className="w-full h-full flex gap-3 flex-col"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-5 items-center w-[60%]">
              <Image
                onClick={(e) => handleProfileChange(e, userId)}
                className="w-[60px] cursor-pointer h-[60px] rounded-full"
                src={profilePic || '/images/placeholder.jpg'}
                alt="profile image"
                width="100"
                height="100"
              />
              <div className="flex flex-col">
                <p
                  onClick={(e) => handleProfileChange(e, userId)}
                  className="text-[12px] cursor-pointer hover:scale-[0.9] font-extrabold"
                >
                  {name}
                </p>
                <p className="text-[12px] text-gray-400">{location}</p>
              </div>
            </div>
            {toggle === 'yes' && (
              <>
                {userId !== currentUserId && (
                  <div onClick={(e) => patch(e, userId)}>
                    {checked ? (
                      <AiOutlineUserDelete
                        className="cursor-pointer"
                        size={20}
                      />
                    ) : (
                      <AiOutlineUserAdd className="cursor-pointer" size={20} />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <p className="font-semibold text-[14px]">
            {description}{' '}
            <span className="text-myblue">{handleHashtag(hashtag)}</span>
          </p>
          {feedPic && (
            <div className="w-full rounded-md h-[354px]">
              <Image
                className="h-full transition-opacity opacity-0 duration-[2s] rounded-md w-full object-cover"
                src={feedPic}
                width="320"
                height="320"
                alt="feed post"
                onLoadingComplete={(image) =>
                  image.classList.remove('opacity-0')
                }
              />
            </div>
          )}
        </div>
        <div className="flex mt-3 items-center justify-between">
          <div className="flex gap-5 items-center">
            <p
              onClick={() => patchLike()}
              className="text-[14px] flex items-center gap-1 font-bold"
            >
              {isLiked ? (
                <AiFillHeart
                  size={20}
                  className="text-[#F72C10] cursor-pointer"
                />
              ) : (
                <AiOutlineHeart
                  size={20}
                  className="text-[#F72C10] cursor-pointer"
                />
              )}
              {count}
            </p>
            <p className="text-[14px] flex items-center gap-1 font-bold">
              <TbMessageCircle2 onClick={() => handleGetPostId()} size={20} />
              {comments.length}
            </p>
          </div>
          <BsSend size={20} />
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
