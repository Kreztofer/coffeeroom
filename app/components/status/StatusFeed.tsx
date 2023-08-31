'use client';

import { useParams } from 'next/navigation';
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
import { useEffect, useState } from 'react';
import useCommentsModal from '@/app/hooks/useCommentsModal';
import { SafeUser } from '@/app/types';
import { Post } from '@prisma/client';
import useLikeAndDislike from '@/app/hooks/useLikeAndDislike';

interface StatusFeedProps {
  feeds?: Post[] | null;
  currentUserId: string;
  currentUser: SafeUser;
  toggle: string;
}

const StatusFeed: React.FC<StatusFeedProps> = ({
  feeds,
  currentUserId,
  currentUser,
  toggle,
}) => {
  const { statusId }: any = useParams();
  const router = useRouter();
  const feed = feeds?.find((feed) => feed.id === statusId);
  const likes = feed?.likes;
  const image = currentUser?.profileImage;

  const userId = feed?.userId;
  const friends = currentUser?.friends;
  const allcomments = feed?.comments;
  const [updatedComments, setUpdatedComments] = useState<any>();
  const [more, setMore] = useState(5);

  const [comment, setComment] = useState('');
  const commentsModal = useCommentsModal();

  const [myComments, setmyComments] = useState<any>(allcomments);

  useEffect(() => {
    setmyComments(allcomments);
  }, [allcomments]);

  const { patch, checked } = useAddFriends({
    userId: currentUserId,
    friendId: userId,
    friends,
  });

  useEffect(() => {
    setUpdatedComments(myComments.slice(0, more));
  }, [more, myComments]);

  const { hasFavorited, toggleFavorite } = useLikeAndDislike({
    postId: statusId,
    likes,
    currentUser,
  });

  const handleHashtag = (hash: string | undefined | null) => {
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

  const handlePlural = (length: number | null | undefined, type: string) => {
    if (type === 'comment') {
      if (length === 1) {
        return 'comment';
      }
      return 'comments';
    }
    if (type === 'likes') {
      if (length === 1) {
        return 'like';
      }
      return 'likes';
    }
  };

  const handleProfileChange = (e: any, id: any) => {
    e.stopPropagation();
    router.push(`/profilepage/${id}`);
  };

  const handlePostComment = async (e: any) => {
    e.preventDefault();
    const data = {
      postId: statusId,
      comment: comment,
      commentPic: currentUser?.profileImage,
      name: currentUser?.name,
      id: currentUser?.id,
    };

    await axios
      .patch('/api/addcomment', data)
      .then(() => toast.success('Success'))
      .catch((error: any) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      })
      .finally(() => {
        router.refresh();
        commentsModal.onClose();
        document.body.style.overflowY = 'auto';
      });
  };

  const handleGetPostId = () => {
    commentsModal.onPost(statusId);
    commentsModal.onOpen();
    document.body.style.overflowY = 'hidden';
  };

  return (
    <div className="w-[48%]">
      <div className="bg-white py-2 rounded-md shadow-md">
        <div className="w-[95%] flex flex-col gap-3 mx-auto my-5">
          <div className="w-full h-full flex gap-3 flex-col">
            <div className="flex items-center justify-between">
              <div className="flex gap-5 items-center w-[60%]">
                <Image
                  onClick={(e) => handleProfileChange(e, userId)}
                  className="w-[60px] cursor-pointer h-[60px] rounded-full"
                  src={feed?.creatorsProfileImage || '/images/placeholder.jpg'}
                  alt="profile image"
                  width="100"
                  height="100"
                />
                <div className="flex flex-col">
                  <p
                    onClick={(e) => handleProfileChange(e, userId)}
                    className="text-[12px] cursor-pointer hover:scale-[0.9] font-extrabold"
                  >
                    {feed?.name}
                  </p>
                  <p className="text-[12px] text-gray-400">{feed?.location}</p>
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
                        <AiOutlineUserAdd
                          className="cursor-pointer"
                          size={20}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            <p className="font-semibold text-[14px]">
              {feed?.description}
              <span className="text-myblue">
                {handleHashtag(feed?.hashtag)}
              </span>
            </p>
            {feed?.postImage && (
              <div className="w-full rounded-md h-[354px]">
                <Image
                  className="h-full transition-opacity opacity-0 duration-[2s] rounded-md w-full object-cover"
                  src={feed?.postImage}
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
          <hr className="mt-3" />
          <div className="flex items-center gap-3">
            <p className="text-[14px] flex items-center gap-1 font-bold">
              {likes?.length}
              <span className="font-normal text-gray-400">
                {' '}
                {handlePlural(likes?.length, 'likes')}
              </span>
            </p>
            <p className="text-[14px] cursor-pointer flex items-center gap-1 font-bold">
              {feed?.comments.length}
              <span className="font-normal text-gray-400">
                {handlePlural(feed?.comments.length, 'comment')}
              </span>
            </p>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <p
              onClick={toggleFavorite}
              className="text-[14px] flex items-center gap-1 font-bold"
            >
              {hasFavorited ? (
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
              {likes?.length}
            </p>
            <p className="text-[14px] cursor-pointer flex items-center gap-1 font-bold">
              <TbMessageCircle2 onClick={() => handleGetPostId()} size={20} />
              {feed?.comments.length}
            </p>

            <BsSend className="cursor-pointer" size={20} />
          </div>
          <hr />
          <div>
            <div className="flex pb-2 items-center justify-between">
              <div className=" items-center flex justify-between w-[80%]">
                <Image
                  src={image || '/images/placeholder.jpg'}
                  width="100"
                  height="100"
                  alt="profile image"
                  className="w-[50px] cursor-pointer h-[50px] rounded-full"
                />
                <div className="w-[85%]">
                  <input
                    autoFocus
                    className="status_input"
                    type="text"
                    placeholder="Say what's on your mind"
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>

              <button
                disabled={comment.length === 0}
                onClick={(e) => handlePostComment(e)}
                className={`text-white ${
                  comment.length === 0
                    ? 'opacity-[60%] '
                    : 'opacity-[100%] duration-150 hover:scale-[1.05]'
                } bg-myblue py-1 px-6 font-semibold rounded-[10px]`}
              >
                Post
              </button>
            </div>
            <div className="flex flex-col">
              {updatedComments?.map((comment: any, id: any) => (
                <div
                  key={id}
                  className="flex justify-between border-y-[1px] border-gray-200 py-3"
                >
                  <Image
                    src={comment?.commentPic || '/images/placeholder.jpg'}
                    width="100"
                    height="100"
                    alt="comment pic"
                    className="w-[50px] cursor-pointer h-[50px] rounded-full"
                  />
                  <div className="flex flex-col w-[90%]">
                    <h2 className="font-extrabold text-[15px]">
                      {comment?.name ? comment?.name : 'anonymous'}
                    </h2>
                    <p className="text-[14px] w-[95%]">{comment?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full mt-2 flex justify-center">
              <p
                onClick={() => setMore(more + 2)}
                className="text-myblue cursor-pointer font-semibold"
              >
                {updatedComments?.length === allcomments?.length
                  ? ''
                  : 'View more'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusFeed;
