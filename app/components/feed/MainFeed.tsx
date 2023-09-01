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
  const CLOUD_NAME = 'dvutsaf4x';
  const UPLOAD_PRESET = 'dth9ggpm';
  const router = useRouter();
  const loading = useLoadingModal();

  const [handleFileUpload, setHandleFileUpload] = useState({
    image: false,
    hashtag: false,
  });
  const [image, setimage] = useState<any>();
  const [imageFile, setImageFile] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [description, setDescription] = useState('');

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();

    formData.append('file', image);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data['secure_url'];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const onPost = async (e: any) => {
    loading.postOpen();

    e.preventDefault();

    setHandleFileUpload({
      ...handleFileUpload,
      image: false,
      hashtag: false,
    });

    try {
      const imageUrl = await uploadImage();

      const data = {
        description: description,
        userId: currentUser?.id,
        postImage: imageUrl,
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
    } catch (error) {}
  };

  return (
    <div
      className={`${main ? 'lg:w-[48%] w-full' : 'w-full'} flex flex-col gap-5`}
    >
      {main && (
        <div className="bg-white p-5 rounded-md shadow-md w-full ">
          <div className="justify-between items-center flex w-full">
            <div>
              <div className="w-[60px] h-[60px]">
                <Image
                  className="rounded-full h-[100%] w-[100%]"
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
            </div>

            <div className="sm:w-[87%] w-[75%] rounded-[40px] h-[50px] flex items-center px-5 bg-gray-100">
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
              <DropZone setImage={setimage} setImageFile={setImageFile} />
            </>
          )}
          {handleFileUpload.hashtag === true && (
            <>
              <Hashtag setHashTag={setHashtag} />
            </>
          )}
          <hr className="mt-5 mb-3" />
          <div className="flex justify-between items-center">
            <div className="md:w-[70%] w-[80%] flex justify-between">
              <p
                onClick={() =>
                  setHandleFileUpload({
                    ...handleFileUpload,
                    image: !handleFileUpload.image,
                  })
                }
                className="flex gap-[4px] md:gap-2 cursor-pointer items-center text-[10px] md:text-[12px] font-bold"
              >
                <Image
                  height="100"
                  width="100"
                  className="w-[12px] md:w-[16px] h-[12px] md:h-[16px]"
                  src="/images/image.png"
                  alt="image"
                />
                Image
              </p>
              <p className="flex gap-[4px] md:gap-2 cursor-pointer items-center text-[10px] md:text-[12px] font-bold">
                <Image
                  height="100"
                  width="100"
                  className="w-[12px] md:w-[16px] h-[13px] md:h-[16px]"
                  src="/images/video.png"
                  alt="video"
                />
                Video
              </p>
              <p className="flex gap-[4px] md:gap-2 cursor-pointer items-center text-[10px] md:text-[12px] font-bold">
                <Image
                  height="100"
                  width="100"
                  className="w-[12px] md:w-[16px] h-[12px] md:h-[16px]"
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
                className="flex gap-[4px] md:gap-2 cursor-pointer items-center text-[10px] md:text-[12px] font-bold"
              >
                <Image
                  height="100"
                  width="100"
                  className="w-[12px] md:w-[16px] h-[12px] md:h-[16px]"
                  src="/images/hashtag.png"
                  alt="chef"
                />
                Hashtag
              </p>
            </div>
            <button
              onClick={(e) => onPost(e)}
              disabled={description.length === 0}
              className={`text-white ${
                description.length === 0
                  ? 'opacity-[60%] '
                  : 'opacity-[100%] duration-150 hover:scale-[1.05]'
              } bg-myblue text-[12px] md:text-[16px] py-1 px-2 md:px-6 font-semibold rounded-[10px]`}
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
