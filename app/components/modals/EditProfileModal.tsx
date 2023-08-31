'use client';

import Modal from './Modal';
import useEditProfileModal from '@/app/hooks/useEditProfileModal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ProfileInput from '../ProfileInput';
import axios from 'axios';
import toast from 'react-hot-toast';
import { OCCUPATIONS } from '@/app/context';
import { SafeUser } from '@/app/types';
import useLoadingModal from '@/app/hooks/useLoading';
import useProfileLoadingModal from '@/app/hooks/useProfileLoading';

interface EditProfileProps {
  currentUser?: SafeUser | null;
}
const EditProfileModal: React.FC<EditProfileProps> = ({ currentUser }) => {
  const CLOUD_NAME = 'dvutsaf4x';
  const UPLOAD_PRESET = 'dth9ggpm';

  const loading = useLoadingModal();
  const [imageFile, setimageFile] = useState<any>([]);

  const [socialId, setSocialId] = useState<number | undefined>(
    currentUser?.socialId || 0
  );
  const [filebase64, setFileBase64] = useState<string | undefined>(
    currentUser?.profileImage || ''
  );
  const [toggle, setToggle] = useState({
    name: true,
    email: true,
    occupation: true,
    location: true,
    twitter: true,
    instagram: true,
    dribbble: true,
    linkedin: true,
  });

  const [toggleBtn, setToggleBtn] = useState(false);
  const editProfileModal = useEditProfileModal();

  const profileLoading = useProfileLoadingModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      occupation: '',
      location: '',
      twitter: '',
      instagram: '',
      dribbble: '',
      linkedin: '',
    },
  });

  useEffect(() => {
    let defaults = {
      name: currentUser?.name,
      email: currentUser?.email,
      occupation: currentUser?.occupation,
      location: currentUser?.location,
      twitter: currentUser?.twitter,
      instagram: currentUser?.instagram,
      dribbble: currentUser?.dribbble,
      linkedin: currentUser?.linkedin,
    };
    reset(defaults);
  }, [currentUser, reset]);

  const convertFile = (files: any) => {
    if (files) {
      setimageFile(files[0]);
      const fileRef = files[0] || '';
      const fileType: string = fileRef.type || '';
      if (
        fileType === 'image/jpeg' ||
        fileType === 'image/png' ||
        fileType === 'image/jpg'
      ) {
        const reader = new FileReader();

        reader.readAsBinaryString(fileRef);
        reader.onload = (ev: any) => {
          // convert it to base64
          setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`);
        };
      } else {
        toast.error('file is not a type of image');
      }
    }

    return files;
  };

  const handleReset = () => {
    reset({
      name: currentUser?.name,
      email: currentUser?.email,
      occupation: currentUser?.occupation,
      location: currentUser?.location,
      twitter: currentUser?.twitter,
      instagram: currentUser?.instagram,
      dribbble: currentUser?.dribbble,
      linkedin: currentUser?.linkedin,
    });
    setToggle({
      name: true,
      email: true,
      occupation: true,
      location: true,
      twitter: true,
      instagram: true,
      dribbble: true,
      linkedin: true,
    });
    setSocialId(0);
  };

  const uploadImage = async () => {
    if (!imageFile) return;

    const formData = new FormData();

    formData.append('file', imageFile);
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (filebase64 === '') {
      loading.onOpen();
    } else {
      profileLoading.onOpen();
      loading.onOpen();
    }

    try {
      const imageUrl = await uploadImage();

      await axios
        .put('/api/updateprofile', {
          ...data,
          id: currentUser?.id,
          socialId: socialId,
          profileImage: imageUrl,
          image: currentUser?.image,
        })
        .then(() => {
          toast.success('Success');
          editProfileModal.onClose();
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message);
          }
        })
        .finally(() => {
          location.reload();
          profileLoading.onClose();
          loading.onClose();
        });
    } catch (error) {
      toast.error('something went wrong');
    }
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex text-sm justify-between w-[90%] mx-auto">
        <div className="w-[30%] gap-5 flex flex-col items-center">
          <>
            {filebase64 && filebase64.indexOf('image/') > -1 ? (
              <Image
                className="rounded-full h-[200px] w-[200px]"
                height="100"
                width="100"
                alt="logo"
                src={filebase64}
              />
            ) : (
              <Image
                className="rounded-full transition-opacity opacity-0 duration-[2s] h-[200px] w-[200px]"
                height="100"
                width="100"
                alt="logo"
                onLoadingComplete={(image) =>
                  image.classList.remove('opacity-0')
                }
                src={
                  currentUser?.image ||
                  currentUser?.profileImage ||
                  '/images/placeholder.jpg'
                }
              />
            )}
          </>

          <button className="px-4  relative py-2 shadow-md bg-white border transition-all duration-200 hover:scale-[1.02] border-t-[#eeeaea] ">
            Change
            <input
              className="absolute top-0 h-full w-full left-0 opacity-0"
              id="image"
              onChange={(e) => convertFile(e.target.files)}
              type="file"
            />
          </button>
        </div>

        <div className="w-[60%] flex gap-5 flex-col">
          <div>
            <ProfileInput
              name="NAME"
              id="name"
              border
              onClick={() => setToggle({ ...toggle, name: false })}
              register={register}
              toggle={toggle.name}
            />
            <ProfileInput
              name="EMAIL"
              id="email"
              onClick={() => setToggle({ ...toggle, email: false })}
              register={register}
              toggle={toggle.email}
            />
            <ProfileInput
              name="LOCATION"
              id="location"
              onClick={() => setToggle({ ...toggle, location: false })}
              register={register}
              toggle={toggle.location}
            />
            <ProfileInput
              name="OCCUPATION"
              id="occupation"
              onClick={() => setToggle({ ...toggle, occupation: false })}
              register={register}
              toggle={toggle.occupation}
            />
          </div>
          {/* icons */}
          <div>
            <h3 className="font-[600] mb-1">SELECT YOUR OCCUPATION ICON</h3>
            <div className="flex items-center px-3 border h-[50px] flex-wrap w-[80%] gap-2 justify-between">
              {OCCUPATIONS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSocialId(item.id)}
                  className={`${
                    socialId === item.id &&
                    'border-2 rounded-full border-myblue p-[5px] items-center'
                  } flex h-auto w-auto cursor-pointer transition hover:scale-[1.05]`}
                >
                  <Image
                    className={`
                      } h-[20px] w-[20px]`}
                    height="50"
                    width="50"
                    src={item.img}
                    alt="icon"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-[50%] h-auto border-b-[1px] border-x-[1px]">
            <button
              onClick={() => setToggleBtn((prev) => !prev)}
              className="py-3 px-2 flex items-center justify-between w-full shadow-md bg-white border border-t-[#eeeaea] "
            >
              <p> Social handles </p>
              <p> {toggleBtn ? <FaChevronUp /> : <FaChevronDown />}</p>
            </button>
            {toggleBtn && (
              <div>
                <ProfileInput
                  id="twitter"
                  register={register}
                  toggle={toggle.twitter}
                  onClick={() => setToggle({ ...toggle, twitter: false })}
                  social
                  placeholder="twitter"
                />
                <ProfileInput
                  id="instagram"
                  register={register}
                  toggle={toggle.instagram}
                  onClick={() => setToggle({ ...toggle, instagram: false })}
                  social
                  placeholder="instagram"
                />
                <ProfileInput
                  id="dribbble"
                  register={register}
                  toggle={toggle.dribbble}
                  onClick={() => setToggle({ ...toggle, dribbble: false })}
                  social
                  placeholder="dribbble"
                />
                <ProfileInput
                  id="linkedin"
                  register={register}
                  toggle={toggle.linkedin}
                  onClick={() => setToggle({ ...toggle, linkedin: false })}
                  social
                  placeholder="linkedin"
                />
              </div>
            )}
          </div>

          <div className="flex gap-10">
            <button
              disabled={loading.isLoading}
              onClick={handleSubmit(onSubmit)}
              className="bg-[#00AFF2] transition-all duration-200 hover:scale-[1.02] shadow-md text-white px-9 py-2"
            >
              {loading.isLoading === true ? (
                <p className="loader"></p>
              ) : (
                <p> Save</p>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-2 shadow-md transition-all duration-200 hover:scale-[1.02] bg-white border border-t-[#eeeaea]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-4">
      <hr />
    </div>
  );
  return (
    <Modal
      isOpen={editProfileModal.isOpen}
      title="Edit Profile"
      onClose={editProfileModal.onClose}
      body={bodyContent}
      footer={footerContent}
      edit
    />
  );
};

export default EditProfileModal;
