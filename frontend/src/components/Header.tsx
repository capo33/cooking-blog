import { useState, useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
 
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import { logout, userProfile } from "../redux/feature/Auth/authSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const token = user?.token as string;
  const avatar = user?.image as string;
  const admin = user?.role  

  useEffect(() => {
    if (token) dispatch(userProfile(token));
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
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
              <li>
                <Link
                  to='/'
                  className='hover:text-slate-500  hover:transition-all '
                >
                  Home
                </Link>
              </li>
              {token ? (
                <>
                  <li>
                    <Link
                      to='/add-recipe'
                      className='hover:text-slate-500  hover:transition-all'
                    >
                      Add Recipe
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/saved-recipes'
                      className='hover:text-slate-500  hover:transition-all'
                    >
                      Saved Recipes
                    </Link>
                  </li>
                  {admin && (
                    <li>
                      <Link
                        to='/categories'
                        className='hover:text-slate-500  hover:transition-all'
                      >
                        Categories
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to='/profile'
                      className='hover:text-slate-500  hover:transition-all '
                    >
                      <img
                        src={avatar}
                        alt='avatar'
                        className='w-10 rounded-full'
                      />
                    </Link>
                  </li>

                  <div className='py-1.5 px-4 hover:bg-teal-400 rounded cursor-pointer flex justify-between'>
                    <Link to='/login' onClick={handleLogout}>
                      Logout
                    </Link>
                    <CiLogout className='w-6 h-6' />
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
