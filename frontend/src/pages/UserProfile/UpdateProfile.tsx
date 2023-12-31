import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileBase from "react-file-base64";

import {
  updateUserProfile,
  userProfile,
} from "../../redux/feature/Auth/authSlice";
import Input from "../../components/ProfileForm/Input";
import BackLink from "../../components/BackLink/BackLink";
import Textarea from "../../components/ProfileForm/Textarea";
import { IUpdateProfile } from "../../interfaces/AuthInterface";
import RecipeButton from "../../components/RecipeForm/RecipeButton";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  const formData = {
    name: user?.name,
    email: user?.email,
    address: user?.address,
    phone: user?.phone,
    about: user?.about,
    birthday: user?.birthday,
    image: user?.image,
    interests: user?.interests,
  };

  const [userData, setUserData] = useState<IUpdateProfile>(formData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  // Handle change for all input fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (token) {
      dispatch(userProfile(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setUserData(user as IUpdateProfile);
    }
  }, [user]);

  // Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        userData: userData as IUpdateProfile,
        token,
        toast,
        navigate,
      })
    );
    navigate("/profile");
  };

  return (
    <section className='p-6 dark:bg-gray-800 dark:text-gray-50 mt-5 '>
      <BackLink link='/profile' name='back to prfoile' />
      <form
        className='container flex flex-col mx-auto space-y-12'
        onSubmit={handleSubmit}
      >
        <fieldset className='grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900'>
          <div className='space-y-2 col-span-full lg:col-span-1'>
            <p className='font-medium'>Personal Inormation</p>
            <p className='text-xs'>
              Add your personal information to complete your profile
            </p>
          </div>
          <div className='grid grid-cols-6 gap-4 col-span-full lg:col-span-3'>
            <div className='col-span-full sm:col-span-3'>
              <Input
                label='Name'
                type='text'
                name='name'
                value={userData?.name || ("" as string)}
                handleChange={handleChange}
                placeholder='Name'
              />
            </div>
            <div className='col-span-full sm:col-span-3'>
              <Input
                label='Address'
                type='text'
                name='address'
                value={userData?.address || ("" as string)}
                handleChange={handleChange}
                placeholder='Address'
              />
            </div>
            <div className='col-span-full sm:col-span-3'>
              <Input
                label='Email'
                type='email'
                name='email'
                value={userData?.email || ("" as string)}
                handleChange={handleChange}
                placeholder='Email'
              />
            </div>
            <div className='col-span-full sm:col-span-3'>
              <Input
                label='Phone'
                type='tel'
                name='phone'
                value={userData?.phone || ("" as string)}
                handleChange={handleChange}
                placeholder='Phone'
              />
            </div>
            <div className='col-span-full sm:col-span-2'>
              <Input
                label='Birthday'
                type='date'
                name='birthday'
                value={
                  userData?.birthday?.toString().slice(0, 10) || ("" as string)
                }
                handleChange={handleChange}
                placeholder='Birthday'
              />
            </div>
          </div>
        </fieldset>
        <fieldset className='grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900'>
          <div className='space-y-2 col-span-full lg:col-span-1'>
            <p className='font-medium'>Profile</p>
            <p className='text-xs'>
              Here you can add your profile picture and write a little about you
            </p>
          </div>
          <div className='grid grid-cols-6 gap-4 col-span-full lg:col-span-3'>
            <div className='col-span-full'>
              <Input
                label='Interests'
                type='text'
                name='interests'
                value={userData?.interests || ([] as string[])}
                handleChange={handleChange}
                placeholder='Interests'
              />
            </div>

            <div className='col-span-full'>
              <Textarea
                label='About Me'
                name='about'
                value={userData?.about || ("" as string)}
                handleChange={handleChange}
                placeholder='About Me'
              />
            </div>

            <div className='col-span-full'>
              <label htmlFor='bio' className='text-sm'>
                Photo
              </label>
              <div className='flex justify-around flex-wrap'>
                <img
                  src={userData?.image}
                  alt={userData?.name as string}
                  className='w-20 h-20 flex justify-center'
                />
                <FileBase
                  type='file'
                  multiple={false}
                  onDone={({ base64 }: any) =>
                    setUserData({
                      ...userData,
                      image: base64,
                    })
                  }
                />
              </div>
              <RecipeButton title='Update' />
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default UpdateProfile;
