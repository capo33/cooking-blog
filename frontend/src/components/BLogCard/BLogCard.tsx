import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegComments } from "react-icons/fa";

import { Recipe } from "../../interfaces/RecipeInterface";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { formatDate, subStringFunc, uperCaseFirstLetter } from "../../utils";

import {
  getAllRecipes, getSavedRecipes,
  // getSavedRecipes,
  // saveRecipe,
  // unsaveRecipe,
} from "../../redux/feature/Recipe/recipeSlice";

interface Props {
  recipe: Recipe;
}

const BLogCard = ({ recipe }: Props) => {
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const token = user?.token as string;
  const userID = user?._id as string;
  const recipesIDs = savedRecipes?.map((recipe) => recipe._id);

  // const isSaved = savedRecipes?.find((item) => item._id === recipe?._id);

  useEffect(() => {
    dispatch(getSavedRecipes({ userID, token }));
    // dispatch(getAllRecipes());
  }, [dispatch, userID, token]);

  

  // const handleSaveRecipe = (recipeID: string) => {
  //   dispatch(
  //     saveRecipe({
  //       recipeID,
  //       userID,
  //       token,
  //     })
  //   );
  // };

  // const handleUnsaveRecipe = (recipeID: string) => {
  //   dispatch(
  //     unsaveRecipe({
  //       recipeID,
  //       userID,
  //       token,
  //     })
  //   );
  // };
  return (
    <div key={recipe?._id}>
        <div className='flex flex-col max-w-lg p-6 space-y-6 overflow-hidden   rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100'>
        <Link to={`/recipe-details/${recipe?._id}`}>
          <div className='flex space-x-4'>
            <img
              alt='avatar'
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
          <div>
            <img
              src={recipe?.image}
              alt='cards'
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
        <div className='flex flex-wrap justify-between'>
          <div className='space-x-2'>
            <button
              // onClick={() => {
              //   recipesIDs?.includes(recipe?._id)
              //     ? handleUnsaveRecipe(recipe?._id as string)
              //     : handleSaveRecipe(recipe?._id as string);
              // }}
              type='button'
              disabled={!user}
              style={!user ? { cursor: "not-allowed" } : { cursor: "pointer" }}
              className={`px-4 py-2 ${
                recipesIDs?.includes(recipe?._id)
                  ? "bg-gray-600 text-white"
                  : "bg-gray-100"
              } rounded-full shadow dark:bg-gray-500 dark:text-gray-500`}
            >
              {recipesIDs?.includes(recipe?._id) ? "Unsave" : "Save"}
            </button>
          </div>
          <div className='flex space-x-2 text-sm dark:text-gray-400'>
            {/* Comments - comming soon */}
            <button type='button' className='flex items-center p-1 space-x-1.5'>
              <FaRegComments style={{ fontSize: "1.1rem" }} />
              <span>{recipe?.reviews?.length}</span>
            </button>

            {/* Views */}
            <button type='button' className='flex items-center p-1 space-x-1.5'>
              <span>
                {recipe?.views} {recipe?.views === 1 ? "view" : "views"}
              </span>
            </button>
            {/* Likes */}
            <span className='flex items-center p-1 space-x-1.5'>
              {recipe?.likes?.length}{" "}
              {recipe?.likes?.length === 1 ? "like" : "likes"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BLogCard;
