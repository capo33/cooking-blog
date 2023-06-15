import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { uperCaseFirstLetter } from "../utils";
import { logout } from "../redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  console.log(user?.about);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const avatar = user?.avatar;
  console.log(user?.about);

  const admin = user?.isAdmin;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className=' bg-slate-400 shad'>
      <div className='justify-between px-4 m-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
        <div>
          <div className='flex items-center justify-between py-3 md:py-5 md:block'>
            <div className='flex items-center justify-between text-xl font-bold'>
              <Link to='/'>
                <h1 className=''>Cooking Blog</h1>
              </Link>
            </div>

            <div className='md:hidden'>
              <div
                style={{ outline: "none", cursor: "pointer" }}
                className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <AiOutlineClose className='w-6 h-6' />
                ) : (
                  <AiOutlineMenu className='w-6 h-6' />
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
              <li className='hover:text-slate-500  hover:transition-all '>
                <Link to='/'>Home</Link>
              </li>
              {admin && (
                <li className='hover:text-slate-500 hover:transition-all '>
                  <Link to='/categories'>Categories</Link>
                </li>
              )}

              {user?.token ? (
                <>
                  <li className='hover:text-slate-500  hover:transition-all'>
                    <Link to='/create'>
                      Add Recipe <span className='text-lg'>+</span>
                    </Link>
                  </li>

                  <li>
                    <span className='font-bold'>
                      {user?.name ? uperCaseFirstLetter(user?.name) : null}
                    </span>
                  </li>
                  <li className='hover:text-slate-500  hover:transition-all '>
                    <Link to='/profile'>
                      <img
                        src={avatar}
                        alt='avatar'
                        className='w-10 rounded-full'
                      />
                    </Link>
                  </li>

                  <div className='bg-orange-500 inline-flex     rounded  '>
                    <div className='py-1.5 px-4 text-white  hover:bg-orange-700 rounded cursor-pointer flex justify-between'>
                      <Link to='/login' onClick={handleLogout}>
                        Logout
                      </Link>
                      <CiLogout className='w-6 h-6' />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <li className='   bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'>
                    <Link to='/login'>Login</Link>
                  </li>
                  <li className='   bg-stone-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'>
                    <Link to='/register'>Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
