import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

import { uperCaseFirstLetter } from "../utils";
import { logout } from "../redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const avatar = user?.avatar;
  const token = user?.token;
  const admin = user?.isAdmin;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className=' bg-teal-400 shad sticky top-0 z-50'>
      <div className='justify-between px-4 m-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
        <div>
          <div className='flex items-center justify-between py-3 md:py-5 md:block'>
            <div className='flex items-center justify-between text-xl font-bold'>
              <Link to='/'>
                <h1 className=''>Cooking Blog</h1>
              </Link>
            </div>

            {/* This is the hamburger menu */}
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
          {/* This is the dropdown menu */}
          <div
            className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
              <li className='hover:text-slate-500  hover:transition-all '>
                <Link to='/'>Home</Link>
              </li>

              {token ? (
                <>
                  <li className='hover:text-slate-500  hover:transition-all '>
                    <Link to='/profile'>
                      <img
                        src={avatar}
                        alt='avatar'
                        className='w-10 rounded-full'
                      />
                    </Link>
                  </li>
                  <div className=' '>
                    <button
                      onClick={handleDropdown}
                      className='text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 outline-none   font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'
                      type='button'
                      data-dropdown-toggle='dropdown'
                    >
                      {user?.name ? uperCaseFirstLetter(user?.name) : null}
                      {isDropdownOpen ? (
                        <AiOutlineUp className='w-4 h-4 ml-2' />
                      ) : (
                        <AiOutlineDown className='w-4 h-4 ml-2' />
                      )}
                    </button>
                    {/* This is the dropdown menu */}
                    <div
                      className={`absolute z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${
                        isDropdownOpen ? "block" : "hidden"
                      }`}
                      id='dropdown'
                    >
                      <div className='px-4 py-3'>
                        <span className='block text-sm'>
                          Signed in as {user?.isAdmin ? "Admin" : "User"}
                        </span>
                        <span className='block text-sm font-medium text-gray-900 truncate'>
                          {user?.email}
                        </span>
                      </div>
                      <ul className='py-1' aria-labelledby='dropdown'>
                        <li>
                          <Link
                            to='/add-recipe'
                            className='text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2'
                          >
                            Add Recipe
                          </Link>
                        </li>
                        <li>
                          <Link
                            to='/saved-recipes'
                            className='text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2'
                          >
                            Saved Recipes
                          </Link>
                        </li>

                        {admin && (
                          <li>
                            <Link
                              to='/categories'
                              className='text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2'
                            >
                              Categories
                            </Link>
                          </li>
                        )}
                        <div
                          
                          className='py-1.5 px-4 hover:bg-teal-400 rounded cursor-pointer flex justify-between'
                        >
                          <Link to='/login' onClick={handleLogout}>Logout</Link>
                          <CiLogout className='w-6 h-6' />
                        </div>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <li className='bg-slate-500 hover:bg-slate-700  font-bold py-2 px-4 rounded'>
                    <Link className='text-white' to='/login'>
                      Login
                    </Link>
                  </li>
                  <li className='   bg-stone-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'>
                    <Link className='text-white' to='/register'>
                      Register
                    </Link>
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
