'use client';

import Image from 'next/image';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import DropZone from '../DropZone';
import axios from 'axios';
import toast from 'react-hot-toast';
import FeedPost from './FeedPost';
import Hashtag from '../Hashtag';
import { useState, useCallback } from 'react';
import { SafePosts, SafeUser } from '@/app/types';
import useLoadingModal from '@/app/hooks/useLoading';
import { Post } from '@prisma/client';

interface MainFeedProps {
  feed?: Post[] | null;
  currentUser: SafeUser | null;
  main: boolean;
  currentUserId: string;
  toggle?: string;
}

const MainFeed: React.FC<MainFeedProps> = ({
  currentUser,
  feed,
  main,
  currentUserId,
  toggle,
}) => {
  const router = useRouter();
  const loading = useLoadingModal();

  const [handleFileUpload, setHandleFileUpload] = useState({
    image: false,
    hashtag: false,
  });
  const [imageFile, setImageFile] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [description, setDescription] = useState('');

  const onPost = async () => {
    loading.postOpen();

    const data = {
      description: description,
      userId: currentUser?.id,
      postImage: imageFile,
      hashtag: hashtag,
    };

    axios
      .post('/api/feeds', data)
      .then(() => {
        toast.success('Success');
      })
      .catch((error: any) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      })
      .finally(() => {
        loading.postClose();
        router.refresh();
      });
  };

  return (
    <div className={`${main ? 'w-[48%]' : 'w-full'} flex flex-col gap-5`}>
      {main && (
        <div className="bg-white p-5 rounded-md shadow-md w-full ">
          <div className="justify-between items-center flex w-full">
            <div className="w-[10%]">
              <Image
                className="rounded-full h-[60px] w-[60px]"
                height="100"
                width="100"
                alt="logo"
                src={
                  currentUser?.image ||
                  currentUser?.profileImage ||
                  '/images/placeholder.jpg'
                }
              />
            </div>
            <div className="w-[87%] rounded-[40px] h-[50px] flex items-center px-5 bg-gray-100">
              <input
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="input-box w-full"
                placeholder="Share something"
              />
            </div>
          </div>
          {handleFileUpload.image === true && (
            <>
              <DropZone setImageFile={setImageFile} />
            </>
          )}
          {handleFileUpload.hashtag === true && (
            <>
              <Hashtag setHashTag={setHashtag} />
            </>
          )}
          <hr className="mt-5 mb-3" />
          <div className="flex justify-between items-center">
            <div className="w-[70%] flex justify-between">
              <p
                onClick={() =>
                  setHandleFileUpload({
                    ...handleFileUpload,
                    image: !handleFileUpload.image,
                  })
                }
                className="flex gap-2 cursor-pointer items-center text-[12px] font-bold"
              >
                <Image
                  height="100"
                  width="100"
                  className="w-[16px] h-[16px]"
                  src="/images/image.png"
                  alt="image"
                />
                Image
              </p>
              <p className="flex gap-2 cursor-pointer items-center text-[12px] font-bold">
                <Image
                  height="100"
                  width="100"
                  className="w-[16px] h-[16px]"
                  src="/images/video.png"
                  alt="video"
                />
                Video
              </p>
              <p className="flex gap-2 cursor-pointer items-center text-[12px] font-bold">
                <Image
                  height="100"
                  width="100"
                  className="w-[16px] h-[16px]"
                  src="/images/attachment.png"
                  alt="Attachment"
                />
                Attachment
              </p>
              <p
                onClick={() =>
                  setHandleFileUpload({
                    ...handleFileUpload,
                    hashtag: !handleFileUpload.hashtag,
                  })
                }
                className="flex gap-2 cursor-pointer items-center text-[12px] font-bold"
              >
                <Image
                  height="100"
                  width="100"
                  className="w-[16px] h-[16px]"
                  src="/images/hashtag.png"
                  alt="chef"
                />
                Hashtag
              </p>
            </div>
            <button
              onClick={onPost}
              disabled={description.length === 0}
              className={`text-white ${
                description.length === 0
                  ? 'opacity-[60%] '
                  : 'opacity-[100%] duration-150 hover:scale-[1.05]'
              } bg-myblue py-1 px-6 font-semibold rounded-[10px]`}
            >
              {loading.postLoading ? <p className="loader" /> : <p>Post</p>}
            </button>
          </div>
        </div>
      )}
      {/* feed */}

      {feed?.map((item) => (
        <FeedPost
          key={item.id}
          id={item.id}
          profilePic={item.creatorsProfileImage}
          userId={item.userId}
          description={item.description}
          location={item.location}
          name={item.name}
          currentUserId={currentUserId}
          feedPic={item.postImage}
          hashtag={item.hashtag}
          friends={currentUser?.friends}
          likes={item.likes}
          currentUser={currentUser}
          toggle={toggle}
          comments={item.comments}
        />
      ))}
    </div>
  );
};

export default MainFeed;
