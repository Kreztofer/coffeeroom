'use client';

import Modal from './Modal';
import useEditProfileModal from '@/app/hooks/useEditProfileModal';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import MyProfileInput from '../MyProfileInput';
import axios from 'axios';
import toast from 'react-hot-toast';
import { OCCUPATIONS } from '@/app/context';
import { SafeUser } from '@/app/types';
import useLoadingModal from '@/app/hooks/useLoading';
import useProfileLoadingModal from '@/app/hooks/useProfileLoading';

interface EditMyProfileProps {
  currentUser?: SafeUser | null;
}
const EditMyProfileModal: React.FC<EditMyProfileProps> = ({ currentUser }) => {
  const loading = useLoadingModal();
  const [imageFile, setimageFile] = useState<any>(currentUser?.profileImage);
  const [id, setId] = useState<any>(currentUser?.id);
  const [name, setName] = useState<any>(currentUser?.name);
  const [email, setEmail] = useState<any>();
  const [occupation, setOccupation] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [twitter, setTwitter] = useState<any>();
  const [instagram, setInstagram] = useState<any>();
  const [dribbble, setDribbble] = useState<any>();
  const [linkedin, setLinkedin] = useState<any>();
  const [socialId, setSocialId] = useState<any>(currentUser?.socialId);
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

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.name);
      setEmail(currentUser?.email);
      setOccupation(currentUser?.occupation);
      setLocation(currentUser?.location);
      setTwitter(currentUser?.twitter);
      setInstagram(currentUser?.instagram);
      setDribbble(currentUser?.dribbble);
      setLinkedin(currentUser?.linkedin);
      setId(currentUser?.id);
    }
  }, [currentUser]);

  const convertFile = (files: any) => {
    setimageFile(files[0]);
    if (files) {
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

  const handleReset = useCallback(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
    setOccupation(currentUser?.occupation);
    setLocation(currentUser?.location);
    setTwitter(currentUser?.twitter);
    setInstagram(currentUser?.instagram);
    setDribbble(currentUser?.dribbble);
    setLinkedin(currentUser?.linkedin);

    //
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
  }, [currentUser]);

  const handleSubmit = async (e: any) => {
    // if (filebase64 === '') {
    //   loading.onOpen();
    // } else {
    //   profileLoading.onOpen();
    //   loading.onOpen();
    // }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', imageFile);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('occupation', occupation);
    formData.append('location', location);
    formData.append('twitter', twitter);
    formData.append('instagram', instagram);
    formData.append('dribbble', dribbble);
    formData.append('linkedin', linkedin);
    formData.append('socialId', socialId);

    await axios
      .put('/api/profileupdate', formData)
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
        window.location.reload();
        profileLoading.onClose();
        loading.onClose();
      });
  };

  // const handleSubmit = useCallback(async (e: any) => {

  //   // if (filebase64 === '') {
  //   //   loading.onOpen();
  //   // } else {
  //   //   profileLoading.onOpen();
  //   //   loading.onOpen();
  //   // }

  //   const formData = new FormData();
  //   formData.set('name', name);

  //   // formData.set('email', email);
  //   // formData.set('occupation', occupation);
  //   // formData.set('location', location);
  //   // formData.set('twitter', twitter);
  //   // formData.set('instagram', instagram);
  //   // formData.set('dribbble', dribbble);
  //   // formData.set('linkedin', linkedin);
  //   // formData.set('file', imageFile);

  //   // await axios
  //   //   .put('/api/profileupdate', formData)
  //   //   .then(() => {
  //   //     toast.success('Success');
  //   //     editProfileModal.onClose();
  //   //   })
  //   //   .catch((error) => {
  //   //     if (error.response) {
  //   //       toast.error(error.response.data.message);
  //   //     }
  //   //   })
  //   //   .finally(() => {
  //   //     window.location.reload();
  //   //     profileLoading.onClose();
  //   //     loading.onClose();
  //   //   });

  //   // eslint-disable-next-line
  // }, []);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex text-sm justify-between w-[90%] mx-auto">
        <div className="w-[30%] gap-5 flex flex-col items-center">
          <>
            {filebase64 && filebase64.indexOf('image/') > -1 ? (
              <Image
                className="rounded-full h-[200px] w-[200px]"
                height="400"
                width="400"
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
            <MyProfileInput
              name="NAME"
              value={name}
              id="name"
              setData={setName}
              border
              onClick={() => setToggle({ ...toggle, name: false })}
              toggle={toggle.name}
            />
            <MyProfileInput
              name="EMAIL"
              value={email}
              id="email"
              setData={setEmail}
              onClick={() => setToggle({ ...toggle, email: false })}
              toggle={toggle.email}
            />
            <MyProfileInput
              name="LOCATION"
              value={location}
              id="location"
              setData={setLocation}
              onClick={() => setToggle({ ...toggle, location: false })}
              toggle={toggle.location}
            />
            <MyProfileInput
              name="OCCUPATION"
              value={occupation}
              setData={setOccupation}
              id="occupation"
              onClick={() => setToggle({ ...toggle, occupation: false })}
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
                <MyProfileInput
                  id="twitter"
                  value={twitter}
                  setData={setTwitter}
                  toggle={toggle.twitter}
                  onClick={() => setToggle({ ...toggle, twitter: false })}
                  social
                  placeholder="twitter"
                />
                <MyProfileInput
                  id="instagram"
                  value={instagram}
                  setData={setInstagram}
                  toggle={toggle.instagram}
                  onClick={() => setToggle({ ...toggle, instagram: false })}
                  social
                  placeholder="instagram"
                />
                <MyProfileInput
                  id="dribbble"
                  value={dribbble}
                  setData={setDribbble}
                  toggle={toggle.dribbble}
                  onClick={() => setToggle({ ...toggle, dribbble: false })}
                  social
                  placeholder="dribbble"
                />
                <MyProfileInput
                  id="linkedin"
                  value={linkedin}
                  setData={setLinkedin}
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
              onClick={(e) => handleSubmit(e)}
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

export default EditMyProfileModal;
