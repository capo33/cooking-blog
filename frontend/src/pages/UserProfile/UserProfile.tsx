import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { logout, userProfile } from "../../redux/feature/Auth/authSlice";
import BackLink from "../../components/BackLink/BackLink";
import Modal from "../../components/Modal/Modal";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { recipes } = useAppSelector((state) => state.recipe);

  const ownedRecipes = recipes?.filter(
    (recipe) => recipe?.owner?._id === user?.result?._id
  );

  console.log("user", user);

  const dispatch = useAppDispatch();

  const userData = {
    name: user?.result?.name,
    email: user?.result?.email,
    avatar: user?.result?.avatar,
    about: user?.result?.about,
    address: user?.result?.address,
    birthday: user?.result?.birthday,
    interests: user?.result?.interests,
    isAdmin: user?.result?.isAdmin,
    phone: user?.result?.phone,
    ownedRecipes: ownedRecipes,
  };
  const token = user?.token;

  useEffect(() => {
    if (token) {
      dispatch(userProfile(token));
    }
  }, [dispatch, token]);

  const handleDeleteProfile = async () => {
    dispatch(logout());
  };

  const handleConfirmDelete = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <div className='container mx-auto my-5 p-5'>
        <BackLink link='/' name='Home' />
        {showModal ? (
          <Modal
            setShowModal={setShowModal}
            handleDelete={handleDeleteProfile}
            value='profile'
          />
        ) : null}

        <div className='md:flex no-wrap md:-mx-2 '>
          <div className='w-full md:w-3/12 md:mx-2'>
            <div className='bg-white p-3 border-t-4 border-green-600'>
              {/* <img
                alt={user?.name}
                src={
                  user?.avatar
                    ? // ? `http://localhost:5000/uploads/${data?.avatar}`
                      `https://corner-blog-api.onrender.com/uploads/${data?.avatar}`
                    : "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                }
                className='shadow-xl rounded-full h-auto align-middle border-none max-w-40-px'
              /> */}
              <div className=' py-5 '>
                <div className='flex justify-center items-center text-center'>
                  <div className='flex items-center'>
                    {/* <Link
                      to={`/update-profile/${data?.id}`}
                      className='flex items-center text-gray-700 hover:text-gray-900 focus:outline-none'
                    >
                      <AiFillEdit className='h-5 w-5 mr-1' />
                      <span className='text-sm'>Edit</span>
                    </Link>
                    <button
                      onClick={handleConfirmDelete}
                      className='flex items-center text-gray-700 hover:text-gray-900 ml-6 focus:outline-none'
                    >
                      <AiFillDelete className='h-5 w-5 mr-1' />
                      <span className='text-sm'>Delete</span>
                    </button> */}
                  </div>
                </div>
              </div>
              <h1 className='text-gray-900 font-bold text-xl leading-8 my-1'>
                {/* {data?.name}
                {ownBlog.length > 5 ? (
                  <span className='text-green-500'> (expert)</span>
                ) : ownBlog.length > 0 ? (
                  <span className='text-blue-500'> (author)</span>
                ) : (
                  <span className='text-gray-500'> (newbie)</span>
                )} */}
              </h1>
              <h3 className='text-gray-600 font-lg text-semibold leading-6'>
                Role
                {/* {data?.role === "admin" ? (
                  <span className='text-red-500'> (admin)</span>
                ) : (
                  <span className='text-blue-500'> {data?.role}</span>
                )} */}
              </h3>

              <ul className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm'>
                <li className='flex items-center py-3'>
                  <span>Status</span>
                  {/* {ownBlog.length > 0 ? (
                    <span className='ml-auto'>
                      <span className='bg-green-600 py-1 px-2 rounded text-white text-sm'>
                        Active
                      </span>
                    </span>
                  ) : (
                    <span className='ml-auto'>
                      <span className='bg-red-600 py-1 px-2 rounded text-white text-sm'>
                        Inactive
                      </span>
                    </span>
                  )} */}
                </li>
                <li className='flex items-center py-3'>
                  <span>Member since:</span>
                  {/* <span className='ml-auto'>{formatDate(data.createdAt)}</span> */}
                </li>
              </ul>
            </div>
          </div>
          <div className='w-full md:w-9/12 mx-2 h-64'>
            <div className='bg-white p-3 shadow-sm rounded-sm'>
              <div className='flex items-center space-x-2 font-semibold text-gray-900 leading-8'>
                <span className='text-green-500'>
                  <svg
                    className='h-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                </span>
                <span className='tracking-wide'>About</span>
              </div>
              <div className='text-gray-700'>
                <div className='grid md:grid-cols-2 text-sm'>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Name</div>
                    {/* <div className='px-4 py-2'>{data?.name}</div> */}
                  </div>

                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Gender</div>
                    <div className='px-4 py-2'>
                      {/* {data?.gender ? data?.gender : "Not Available Yet"} */}
                    </div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Phone</div>
                    <div className='px-4 py-2'>
                      {/* {data?.phone ? data?.phone : "Not Available Yet"} */}
                    </div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>
                      Current Address
                    </div>
                    <div className='px-4 py-2'>
                      {/* {data?.address ? data?.address : "Not Available Yet"} */}
                    </div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Email</div>
                    <div className='px-4 py-2'>
                      {/* {data?.email ? data?.email : "Not Available Yet"} */}
                    </div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Birthday</div>
                    <div className='px-4 py-2'>
                      {/* {data?.birthday ? data?.birthday : "Not Available Yet"} */}
                    </div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Written blogs</div>
                    <div className='px-4 py-2'>
                      {/* {ownBlog.length > 0
                        ? ownBlog.length
                        : "Not Available Yet"} */}
                    </div>
                  </div>
                  <div className='grid grid-cols-2'>
                    <div className='px-4 py-2 font-semibold'>Interests</div>
                    <div className='px-4 py-2'>
                      {/* {data?.interests?.length > 0
                        ? data?.interests?.map((interest, index) => (
                            <span
                              key={index}
                              className='px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium mr-2'
                            >
                              {interest}
                            </span>
                          ))
                        : "Not Available Yet"} */}
                    </div>
                  </div>
                  <div className='grid grid-cols'>
                    <div className='px-4 py-2 font-bold'>Bio</div>
                    <div className='px-4 py-2'>
                      {/* {data?.about
                        ? data?.about
                        : "Update your bio to tell more about yourself."} */}
                    </div>
                  </div>
                </div>

                <div className='bg-white p-3 hover:shadow'>
                  <div className='flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8'>
                    <span className='text-green-500'>
                      <svg
                        className='h-5 fill-current'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                        />
                      </svg>
                    </span>
                    <span>Own Blogs</span>
                  </div>
                  <div className='grid grid-cols-6'>
                    {/* {ownBlog.length > 0
                      ? ownBlog?.map((blog, index) => (
                          <div className='text-center my-2' key={index}>
                            <img
                              className='h-16 w-16 rounded-full mx-auto'
                              // src={`http://localhost:5000/uploads/${blog?.photo}`}
                              src={`https://corner-blog-api.onrender.com/uploads/${blog?.photo}`}
                              alt=''
                            />
                            {blog?.title}
                          </div>
                        ))
                      : "You have not written any blog yet."} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
