import { useEffect, useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Rating, Tooltip, Typography } from "@material-tailwind/react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { formatDate } from "../../utils";
import {
  addReview,
  deleteRecipe,
  getSavedRecipes,
  getSingleRecipe,
  saveRecipe,
  unsaveRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import Modal from "../../components/Modal/Modal";
import BackLink from "../../components/BackLink/BackLink";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { Review } from "../../interfaces/RecipeInterface";
import RecipeButton from "../../components/RecipeForm/RecipeButton";
import moment from "moment";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [showModal, setShowModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { recipe } = useAppSelector((state) => state.recipe);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const [data, setData] = useState<Review>({
    rating: 0,
    comment: "",
  });

  const token = user?.token as string;
  const userID = user?._id as string;
  const guestID = recipe?.owner?._id as string;
  const recipesIDs = savedRecipes?.map((recipe) => recipe._id);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleRecipe(id as string));
    if (token) {
      dispatch(getSavedRecipes({ userID, token }));
    }
  }, [dispatch, id, token, userID]);

  // Delete handler for recipe
  const handleDeleteBlog = async () => {
    dispatch(
      deleteRecipe({
        recipeID: recipe?._id as string,
        token,
        navigate,
        toast,
      })
    );
  };
  const handleConfirmDelete = () => {
    setShowModal((prev) => !prev);
  };

  // Save Recipe
  const handleSaveRecipe = (recipeID: string) => {
    dispatch(
      saveRecipe({
        recipeID,
        userID,
        token,
      })
    );
  };

  // Unsave Recipe
  const handleUnsaveRecipe = (recipeID: string) => {
    dispatch(
      unsaveRecipe({
        recipeID,
        userID,
        token,
      })
    );
  };

  // Submit handler for review
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addReview({
        recipeID: recipe?._id as string,
        formData: data,
        token,
        toast,
      })
    );
    setData({
      rating: 0,
      comment: "",
    });
  };

  return (
    <main className='mt-10'>
      <BackLink link='/' name='Back to Home' />
      {showModal ? (
        <>
          <Modal
            setShowModal={setShowModal}
            handleDelete={handleDeleteBlog}
            value='recipe'
          />
        </>
      ) : null}

      {/* Recipe Image Details */}
      <div className='mb-4 md:mb-0 w-full h-96 max-w-screen-md mx-auto relative'>
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
          <h3 className='text-3xl font-semibold text-gray-100 leading-tight'>
            {recipe?.name ? recipe?.name : "No Name"}
          </h3>
          <div className='flex mt-3'>
            <Link
              to={
                recipe?.owner?._id !== userID
                  ? `/user-profile/${guestID}`
                  : "/profile"
              }
            >
              <img
                src={recipe?.owner?.image}
                className='h-10 w-10 rounded-full mr-2 object-cover'
                alt={recipe?.owner?.name}
              />
            </Link>
            <div>
              <p className='font-semibold text-gray-200 text-sm'>
                by @{recipe?.owner?.name ? recipe?.owner?.name : "Anonymous"}
              </p>
              <p className='font-semibold text-gray-400 text-xs'>
                {formatDate(recipe?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Recipe */}
      <div className='flex justify-end mb-5 px-4 lg:px-0 mt-5 max-w-screen-md mx-auto text-cyan-900 hover:text-teal-900'>
        {!user ? (
          <Tooltip content='Login to save recipe'>
            <BookmarkIcon className='h-5 w-5' />
          </Tooltip>
        ) : (
          <>
            {recipesIDs?.includes(recipe?._id as string) ? (
              <>
                <span className='badge rounded-pill'>Unsave</span>
                <BookmarkSlashIcon
                  className='h-5 w-5 cursor-pointer'
                  onClick={() => handleUnsaveRecipe(recipe?._id as string)}
                />
              </>
            ) : (
              <>
                <span className='badge rounded-pill text-bg-warning'>Save</span>
                <BookmarkIcon
                  className='h-5 w-5 cursor-pointer'
                  onClick={() => handleSaveRecipe(recipe?._id as string)}
                />
              </>
            )}
          </>
        )}
      </div>

      {/* Recipe Details */}
      <div className='px-4 lg:px-0 mt-12 max-w-screen-md mx-auto leading-relaxed'>
        {/* Ingredient */}
        <Typography variant='h5'>Ingredients</Typography>
        {recipe?.ingredients?.map((ingredient, index) => (
          <div
            id='ingredient'
            className='flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4 border-l-teal-300 bg-gradient-to-r from-teal-100 to-transparent hover:from-teal-200'
            key={index}
          >
            <div>{ingredient}</div>
          </div>
        ))}

        {/* Instructions */}
        <Typography variant='h5' className='mt-6'>
          Instructions
        </Typography>

        <Typography
          className='pb-6'
          // dangerouslySetInnerHTML={{
          //   __html: recipe?.instructions
          //     ? recipe?.instructions
          //     : "No Instructions",
          // }}
        >
          {recipe?.instructions ? recipe?.instructions : "No Instructions"}
        </Typography>

        <div className='flex justify-between'>
          <div className='flex items-center'>
            {recipe?.owner?._id === userID && (
              <>
                <Link
                  to={`/update-recipe/${recipe?._id}`}
                  className='flex items-center text-blue-700 hover:text-blue-900 focus:outline-none'
                >
                  <PencilSquareIcon className='h-5 w-5 mr-1' />
                  <span className='text-sm'>Edit</span>
                </Link>

                <button
                  onClick={handleConfirmDelete}
                  className='flex items-center text-deep-orange-700 hover:text-deep-orange-900 ml-6 focus:outline-none'
                >
                  <TrashIcon className='h-5 w-5 mr-1' />
                  <span className='text-sm'>Delete</span>
                </button>
              </>
            )}
          </div>
        </div>

        <Typography variant='h5' className='mt-6'>
          Reviews
        </Typography>

        <form
          className='max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-5'
          onSubmit={handleSubmit}
        >
          <div className='px-3 mb-2 mt-2'>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <select
                className='w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-10 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
                value={data.rating}
                onChange={(e) =>
                  setData({
                    ...data,
                    rating: e.target.value as unknown as number,
                  })
                }
              >
                <option value=''>Select...</option>
                <option value='1'>1 - Unacceptable</option>
                <option value='2'>2 - Needs Improvement</option>
                <option value='3'>3 - Decent</option>
                <option value='4'>4 - Good</option>
                <option value='5'>5 - Very tasty</option>
              </select>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <textarea
                placeholder='comment'
                value={data.comment}
                onChange={(e) =>
                  setData({ ...data, comment: e.target.value as string })
                }
                className='w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
              ></textarea>
            </div>
          </div>
          <div className='flex justify-end px-4'>
            <RecipeButton title='Comment' />
          </div>
        </form>

        {recipe?.reviews?.length === 0 && (
          <div className='flex justify-center items-center'>
            <p className='text-gray-400'>No reviews yet</p>
          </div>
        )}

        {/* Reviews */}
        <div className='grid grid-cols-1 gap-4 mt-6'>
          {recipe?.reviews?.map((review) => (
            <div
              className='bg-white  rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500'
              key={review?._id}
            >
              <div className='mt-4'>
                <h1 className='text-lg text-gray-700 font-semibold hover:underline cursor-pointer'>
                  {review?.name}
                </h1>
                <div className='flex mt-2'>
                  <Rating value={review?.rating} />
                </div>
                <p className='mt-4 text-md text-gray-600'>{review?.comment}</p>
                <div className='flex justify-between items-center'>
                  <div className='mt-4 flex items-center space-x-4 py-6'>
                    <div className='text-sm font-semibold'>
                      <span className='font-normal'>
                        {moment(review?.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RecipeDetails;
