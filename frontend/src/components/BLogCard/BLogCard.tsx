import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegComments } from "react-icons/fa";
import { Chip } from "@material-tailwind/react";

import { Recipe } from "../../interfaces/RecipeInterface";
import { userProfile } from "../../redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getSavedRecipes } from "../../redux/feature/Recipe/recipeSlice";
import { formatDate, subStringFunc, uperCaseFirstLetter } from "../../utils";


type RecipeCardProps = {
  recipe: Recipe;
};

const BLogCard = ({ recipe }: RecipeCardProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();

  const token = user?.token as string;
  const userID = user?.result?._id as string;

  const recipesIDs = savedRecipes?.map((recipe) => recipe._id);

  useEffect(() => {
    // if(user){
    //   dispatch(userProfile(token));
    // }
    dispatch(getSavedRecipes({ userID, token }));
  }, [dispatch, userID, token, user]);

  return (
    <div key={recipe?._id}>
      {/* Card Header */}
      <div className='flex flex-col max-w-lg p-6 space-y-6 overflow-hidden   rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100'>
        <div className='flex space-x-4'>
          <img
            alt={recipe?.owner?.name}
            src={recipe?.owner?.avatar}
            className='object-cover w-12 h-12 mb-2 rounded-full shadow dark:bg-gray-500'
          />
          <div className='flex flex-col space-y-1'>
            <span className='text-sm font-semibold'>
              {recipe?.owner?.name
                ? uperCaseFirstLetter(recipe?.owner?.name)
                : "Anonymous"}
            </span>
            <span className='text-xs dark:text-gray-400'>
              <time>{formatDate(recipe?.createdAt)}</time>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <Link to={`/recipe-details/${recipe?._id}`}>
          <div>
            <img
              src={recipe?.image}
              alt={recipe?.name}
              className='object-cover w-full mb-4 h-60 p-1 rounded-lg sm:h-72 dark:bg-gray-500'
            />

            <h2 className='mb-1 text-xl font-semibold'>{recipe?.name}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: subStringFunc(recipe?.instructions, 40),
              }}
              className='text-sm dark:text-gray-400'
            />
          </div>
        </Link>

        {/* Card Footer */}
        <div className='flex flex-wrap justify-between'>
          <div className='space-x-2'>
            {recipesIDs?.includes(recipe._id) ? (
              <Chip variant='ghost' color='green' size='sm' value='Saved' />
            ) : (
              <Chip variant='ghost' size='sm' color='red' value='Not Saved' />
            )}
          </div>
          <div className='flex space-x-2 text-sm dark:text-gray-400'>
            {/* Comments - comming soon */}
            <div className='flex items-center p-1 space-x-1.5'>
              <FaRegComments style={{ fontSize: "1.1rem" }} />
              <span>{recipe?.reviews?.length}</span>
            </div>

            {/* Views */}
            <div className='flex items-center p-1 space-x-1.5'>
              <span>
                {recipe?.views} {recipe?.views === 1 ? "view" : "views"}
              </span>
            </div>
            {/* Likes */}
            <div className='flex items-center p-1 space-x-1.5'>
              <span>
                {recipe?.likes?.length}{" "}
                {recipe?.likes?.length === 1 ? "like" : "likes"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BLogCard;
