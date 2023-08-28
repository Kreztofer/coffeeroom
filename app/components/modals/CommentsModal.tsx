'use client';

import Modal from './Modal';
import Image from 'next/image';
import useCommentsModal from '@/app/hooks/useCommentsModal';
import { useState } from 'react';

import { HiBadgeCheck } from 'react-icons/hi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/app/types';
import { Post } from '@prisma/client';

interface CommentsModalProps {
  currentUser: SafeUser | null;
  feeds: Post[] | null;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  currentUser,
  feeds,
}) => {
  const router = useRouter();
  const commentsModal = useCommentsModal();
  const [comment, setComment] = useState('');
  const postId = commentsModal.postId;
  const feed = feeds?.find((feed) => feed.id === postId);

  const handlePostComment = async () => {
    const data = {
      postId: postId,
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

  const bodyContent = (
    <div>
      <div className="flex gap-[20px]">
        <div className="">
          <div className="flex h-full">
            <div className="flex h-full">
              <div className="flex items-center h-full flex-col">
                <Image
                  width="100"
                  height="100"
                  className="w-[50px] cursor-pointer h-[50px] rounded-full"
                  src={feed?.creatorsImage || '/images/placeholder.jpg'}
                  alt="profile image"
                />
                <div className="border-[2px] border-solid border-gray-300 h-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[200px]">
          <h2 className="font-extrabold text-[16px] flex gap-1">
            {feed?.name} {<HiBadgeCheck className="text-myblue" />}
          </h2>
          <p className="text-[14px] mt-2">{feed?.description}</p>
        </div>
      </div>
      <div className="flex mt-5 items-center justify-between">
        <div className="flex gap-5">
          <Image
            width="100"
            height="100"
            className="w-[50px] cursor-pointer h-[50px] rounded-full"
            src={currentUser?.profileImage || '/images/placeholder.jpg'}
            alt="profile image"
          />
          <input
            autoFocus
            className="comment w-[70%]"
            type="text"
            placeholder="Say what's on your mind"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          onClick={() => handlePostComment()}
          disabled={comment.length === 0}
          className={`text-white ${
            comment.length === 0
              ? 'opacity-[60%] '
              : 'opacity-[100%] duration-150 hover:scale-[1.05]'
          } bg-myblue py-1 px-6 font-semibold rounded-[10px]`}
        >
          Post
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={commentsModal.isOpen}
      onClose={commentsModal.onClose}
      body={bodyContent}
    />
  );
};

export default CommentsModal;
