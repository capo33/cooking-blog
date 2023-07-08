import React, { useEffect } from "react";
 import { TrashIcon } from "@heroicons/react/24/outline";

import {
  getSavedRecipes,
  unsaveRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import { userProfile } from "../../redux/feature/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import BackLink from "../../components/BackLink/BackLink";

const SavedRecipes = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const token = user?.token as string;
  const userID = user?._id as string;
console.log(userID);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getSavedRecipes({ userID, token }));
      dispatch(userProfile(token));
    }
  }, [dispatch, token, userID]);

  const handleUnsaveRecipe = (recipeID: string) => {
    dispatch(
      unsaveRecipe({
        recipeID,
        userID,
        token,
      })
    );
  };

  return (
    <div className='flex flex-col max-w-4xl m-auto p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100 '>
      <h2 className='text-center m-5 text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white'>
        Saved Recipes
      </h2>
        <BackLink link="/" name="Back to home" />
      <h2 className='text-xl font-semibold'>
        {savedRecipes?.length === 0
          ? "No saved recipes"
          : "My saved recipes"}
      </h2>
      <div className="">

      </div>
      <ul className='flex flex-col divide-y divide-gray-700'>
        {savedRecipes?.map((myRecipe) => (
          <div key={myRecipe._id}>
            <li className='flex flex-col py-6 sm:flex-row sm:justify-between'>
              <div className='flex w-full space-x-2 sm:space-x-4'>
                <img
                  className='flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500'
                  src={myRecipe?.image}
                  alt={myRecipe?.name}
                />
                <div className='flex flex-col justify-between w-full pb-4'>
                  <div className='flex justify-between w-full pb-2 space-x-2'>
                    <div className='space-y-1'>
                      <h3 className='font-semibold '>{myRecipe?.name}</h3>
                      <p>
                        <span className='rounded bg-blue-500 p-1 text-xs text-white'>
                          {myRecipe?.category?.name}
                        </span>
                      </p>
                      <p>
                        <span className='rounded bg-blue-gray-600 p-1 text-xs text-white'>
                          {myRecipe?.owner?.name}
                        </span>
                      </p>
                    </div>
                    <div className='text-right'>
                      <div className='flex text-sm'>
                        <button
                          type='button'
                          className='flex items-center px-2 py-1 pl-0 space-x-1'
                          onClick={() =>
                            handleUnsaveRecipe(myRecipe._id as string)
                          }
                        >
                          <TrashIcon className='w-4 h-4' />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes;
