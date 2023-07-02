import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { AiFillEdit, TrashIcon } from "react-icons/ai";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

import {
  getSingleRecipe,
  saveRecipe,
  unsaveRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";

import { userProfile } from "../../redux/feature/Auth/authSlice";
import { Card, Typography } from "@material-tailwind/react";
import { formatDate } from "../../utils";
import Modal from "../../components/Modal/Modal";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { recipe } = useAppSelector((state) => state.recipe);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const token = user?.token as string;
  const userID = user?.result?._id as string;
  const recipesIDs = savedRecipes?.map((recipe) => recipe._id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleRecipe(id as string));
  }, [dispatch, id]);

  const handleDeleteBlog = async () => {
    // dispatch(deleteBlog({ id, token: data?.token, toast, navigate }));
  };
  const handleConfirmDelete = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <main className='mt-10'>
      {showModal ? (
        <>
          <Modal
            setShowModal={setShowModal}
            handleDelete={handleDeleteBlog}
            value='recipe'
          />
        </>
      ) : null}

      {/* <BackLink link='/' name='Home' /> */}
      <div
        className='mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative'
        style={{ height: "24em" }}
      >
        <div
          className='absolute left-0 bottom-0 w-full h-full z-10'
          style={{
            backgroundImage:
              "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
          }}
        />
        <img
          src={recipe?.image}
          className='absolute left-0 top-0 w-full h-full z-0 object-cover'
          alt={recipe?.name}
        />

        <div className='p-4 absolute bottom-0 left-0 z-20'>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
            {recipe?.category?.name ? recipe?.category?.name : "No Category"}
          </span>
          <h2 className='text-4xl font-semibold text-gray-100 leading-tight'>
            {recipe?.name ? recipe?.name : "No Name"}
          </h2>
          <div className='flex mt-3'>
            <img
              src={recipe?.owner?.avatar}
              className='h-10 w-10 rounded-full mr-2 object-cover'
              alt={recipe?.owner?.name}
            />
            <div>
              <p className='font-semibold text-gray-200 text-sm'>
                {recipe?.owner?.name ? recipe?.owner?.name : "Anonymous"}
              </p>
              <p className='font-semibold text-gray-400 text-xs'>
                {formatDate(recipe?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed'>
        <p
          className='pb-6'
          dangerouslySetInnerHTML={{
            __html: recipe?.instructions
              ? recipe?.instructions
              : "No Instructions",
          }}
        />
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            {/* <button
              onClick={handleLikePost}
              className='flex items-center text-gray-700 hover:text-gray-900 focus:outline-none'
            >
              <Like likes={likes} auth={auth} />
            </button> */}
          </div>
          <div className='flex items-center'>
            {recipe?.owner?._id === userID && (
              <>
                <Link
                  to={`/update-recipe/${recipe?._id}`}
                  className='flex items-center text-gray-700 hover:text-gray-900 focus:outline-none'
                >
                  <PencilSquareIcon className='h-5 w-5 mr-1' />
                  <span className='text-sm'>Edit</span>
                </Link>

                <button
                  onClick={handleConfirmDelete}
                  className='flex items-center text-gray-700 hover:text-gray-900 ml-6 focus:outline-none'
                >
                  <TrashIcon className='h-5 w-5 mr-1' />
                  <span className='text-sm'>Delete</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetails;
