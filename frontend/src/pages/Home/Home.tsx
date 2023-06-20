import React, { useEffect } from "react";
import { GiRiceCooker } from "react-icons/gi";

import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../../redux/feature/Recipe/recipeSlice";
import { Recipe } from "../../interfaces/RecipeInterface";
import BLogCard from "../../components/BLogCard/BLogCard";
import Landing from "./Landing";

const Home = () => {
  const { recipes } = useAppSelector((state) => state.recipe);
  const { user } = useAppSelector((state) => state.auth);
  console.log("recipes", recipes);

  const dispatch = useAppDispatch();

  const token = user?.token;
  const userID = user?._id;

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <Landing />
        <h2>
          <div className='max-w-screen-xl mx-auto px-5 py-10 md:py-16'>
            <div className='border-b mb-5 flex justify-between text-sm'>
              <div className='text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-teal-600 uppercase'>
                <GiRiceCooker className='w-6 h-6 mr-3' />
                   Recipes
                </div>
                <Link to='/' className='font-semibold inline-block'>
                </Link>
              </div>
            </div>
        </h2>
           <div className='grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3 '>
            {recipes &&
              recipes?.map((recipe: Recipe) => (
                <BLogCard key={recipe._id} recipe={recipe} />
              ))}
          </div>
       </section>
    </>

    // <div>
    //   <div className='max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16'>
    //     <div className='border-b mb-5 flex justify-between text-sm'>
    //       <div className='text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-teal-600 uppercase'>
    //         <GiRiceCooker className='w-6 h-6 mr-3' />

    //         <Link to='/' className='font-semibold inline-block'>
    //           Cooking Blog
    //         </Link>
    //       </div>
    //       <Link to='/'>See All</Link>
    //     </div>

    //     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
    //       {recipes &&
    //         recipes?.map((recipe: Recipe) => (
    //           <>
    //             {console.log(recipe.image)}

    //             <div className='flex flex-col'>
    //               <div className='rounded overflow-hidden shadow-lg flex flex-col'>
    //                 <img
    //                   className='w-full'
    //                   src={recipe?.image}
    //                   alt={recipe?.name}
    //                 />
    //                 <div className='px-6 py-4 mb-auto'>
    //                   <div className='mb-3'>
    //                     <Link
    //                       to='/'
    //                       className='text-xs text-indigo-600 transition duration-500 ease-in-out'
    //                     >
    //                       Cooking
    //                     </Link>
    //                     ,{" "}
    //                     <Link
    //                       to='/'
    //                       className='text-xs text-indigo-600 transition duration-500 ease-in-out'
    //                     >
    //                       Recipe
    //                     </Link>
    //                   </div>
    //                 </div>
    //                 <div className='px-6 py-4'>
    //                   <div className='font-bold text-xl mb-2'>
    //                     {recipe?.name}
    //                   </div>
    //                   <p className='text-gray-700 text-base'>
    //                     {recipe?.instructions}
    //                   </p>
    //                 </div>
    //                 <div className='px-6 pt-4 pb-2'>
    //                   <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
    //                     {recipe?.category?.name}
    //                   </span>
    //                   <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
    //                     {recipe?.name}
    //                   </span>
    //                   <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
    //                     {recipe?.owner?.name}
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>
    //           </>
    //         ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;

{
  /* <Link to='/'>
              <img
                className='w-full'
                src='https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                alt='Sunset in the mountains'
              />
            </Link>
            <div className='px-6 py-4 mb-auto'>
              <div className='mb-3'>
                <Link
                  to='/'
                  className='text-xs text-indigo-600 transition duration-500 ease-in-out'
                >
                  Cooking
                </Link>
                ,{" "}
                <Link
                  to='/'
                  className='text-xs text-indigo-600 transition duration-500 ease-in-out'
                >
                  Recipe
                </Link>
              </div>
              <Link
                to='/'
                className='font-medium text-lg   hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2'
              >
                Simplest Salad Recipe ever
              </Link>
              <p className='text-gray-500 text-sm'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className='flex items-center px-6 pb-4'>
              <Link to='/'>
                <img
                  className='w-12 h-12 rounded-full mr-2'
                  src='https://tailwindcss.com/img/jonathan.jpg'
                  alt='Avatar of Jonathan Reinink'
                />
              </Link>
              <div className='text-sm'>
                <Link
                  to='/'
                  className='text-gray-900 font-medium leading-none hover:text-indigo-600'
                >
                  Jonathan Reinink
                </Link>
                <p className='text-gray-600'>Aug 18</p>
              </div>
            </div> */
}