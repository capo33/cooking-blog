import { useState, useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "../redux/app/store";
import { logout, userProfile } from "../redux/feature/Auth/authSlice";
import { uperCaseFirstLetter } from "../utils";
import { getSavedRecipes } from "../redux/feature/Recipe/recipeSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;
  const avatar = user?.image as string;
  const userID = user?._id as string;

  const admin = user?.role;

  useEffect(() => {
    if (token) {
      dispatch(userProfile(token));
      dispatch(getSavedRecipes({ userID, token }));
    }
  }, [dispatch, token, userID]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    // <nav className=' bg-teal-400 shad sticky top-0 z-50'>
    //   <div className='justify-between px-4 m-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
    //     <div>
    //       <div className='flex items-center justify-between py-3 md:py-5 md:block'>
    //         <div className='flex items-center justify-between text-xl font-bold'>
    //           <Link to='/'>
    //             <h1 className=''>Cooking Blog</h1>
    //           </Link>
    //         </div>

    //         {/* This is the hamburger menu */}
    //         <div className='md:hidden'>
    //           <div
    //             style={{ outline: "none", cursor: "pointer" }}
    //             className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
    //             onClick={() => setIsOpen(!isOpen)}
    //           >
    //             {isOpen ? (
    //               <AiOutlineClose className='w-6 h-6' />
    //             ) : (
    //               <AiOutlineMenu className='w-6 h-6' />
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div>
    //       {/* This is the dropdown menu */}
    //       <div
    //         className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
    //           isOpen ? "block" : "hidden"
    //         }`}
    //       >
    //         <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
    //           <li>
    //             <Link
    //               to='/'
    //               className='hover:text-slate-500  hover:transition-all '
    //             >
    //               Home
    //             </Link>
    //           </li>
    //           {token ? (
    //             <>
    //               <li>
    //                 <Link
    //                   to='/add-recipe'
    //                   className='hover:text-slate-500  hover:transition-all'
    //                 >
    //                   Add Recipe
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link
    //                   to='/saved-recipes'
    //                   className='hover:text-slate-500  hover:transition-all'
    //                 >
    //                   Saved Recipes
    //                 </Link>
    //               </li>
    //               {admin && (
    //                 <li>
    //                   <Link
    //                     to='/categories'
    //                     className='hover:text-slate-500  hover:transition-all'
    //                   >
    //                     Categories
    //                   </Link>
    //                 </li>
    //               )}
    //               <li>
    //                 <Link
    //                   to='/profile'
    //                   className='hover:text-slate-500  hover:transition-all '
    //                 >
    //                   <img
    //                     src={avatar}
    //                     alt='avatar'
    //                     className='w-10 rounded-full'
    //                   />
    //                 </Link>
    //               </li>

    //               <div className='py-1.5 px-4 hover:bg-teal-400 rounded cursor-pointer flex justify-between'>
    //                 <Link to='/login' onClick={handleLogout}>
    //                   Logout
    //                 </Link>
    //                 <CiLogout className='w-6 h-6' />
    //               </div>
    //             </>
    //           ) : (
    //             <>
    //               <li className='bg-slate-500 hover:bg-slate-700  font-bold py-2 px-4 rounded'>
    //                 <Link className='text-white' to='/login'>
    //                   Login
    //                 </Link>
    //               </li>
    //               <li className='   bg-stone-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'>
    //                 <Link className='text-white' to='/register'>
    //                   Register
    //                 </Link>
    //               </li>
    //             </>
    //           )}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </nav>

    <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-between py-3 mb-4 border-bottom'>
      {/* Logo */}
      <Link
        to='/'
        className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none'
      >
        <img
          width='64'
          height='64'
          src='https://img.icons8.com/external-becris-lineal-color-becris/64/external-recipe-kitchen-cooking-becris-lineal-color-becris-1.png'
          alt='external-recipe-kitchen-cooking-becris-lineal-color-becris-1'
        />
      </Link>

      {/* Search */}
      <div className='col-md-3 text-end'>
        <form method='POST' action='/search'>
          <input
            type='search'
            name='searchTerm'
            className='form-control'
            placeholder='Search...'
            aria-label='Search'
          />
        </form>
      </div>

      {/* Nav */}
      <ul className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0'>
        <li>
          <Link to='/' className='nav-link px-2 link-secondary'>
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/saved-recipes'
            className='nav-link px-2 link-secondary position-relative'
          >
            Saved-Recipes{" "}
            {savedRecipes?.length > 0 && (
              <span className='badge rounded-pill bg-danger'>
                {savedRecipes?.length}
              </span>
            )}
          </Link>
        </li>
      </ul>

      <span className='link-info'>
        {user?.name && uperCaseFirstLetter(user?.name)}
      </span>

      {/* Dropdown */}
      <div className='dropdown'>
        <Link
          to='/'
          className='d-block link-dark text-decoration-none dropdown-toggle'
          id='dropdownUser1'
          data-bs-toggle='dropdown'
          aria-expanded='false'
          // onClick={handleDropdown}
        >
          {user ? (
            <img
              src={avatar}
              alt='mdo'
              width='32'
              height='32'
              className='rounded-circle'
            />
          ) : (
            "Cooking App"
          )}
        </Link>
        <ul
          className='dropdown-menu text-small'
          aria-labelledby='dropdownUser1'
        >
          {user ? (
            <>
              <li>
                <Link className='dropdown-item' to='/profile'>
                  Profile
                </Link>
                <Link className='dropdown-item' to='/add-recipe'>
                  Add Recipe
                </Link>
              </li>
              <li></li>
              {admin && (
                <li>
                  <Link to='/add-category' className='dropdown-item'>
                    Add Category
                  </Link>
                </li>
              )}
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <Link className='dropdown-item' to='/' onClick={handleLogout}>
                  Sign out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login' className='dropdown-item' type='button'>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/register' className='dropdown-item'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
