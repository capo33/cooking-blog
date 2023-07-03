import { useEffect, useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Typography } from "@material-tailwind/react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { formatDate } from "../../utils";
import {
  deleteRecipe,
  getSavedRecipes,
  getSingleRecipe,
  saveRecipe,
  unsaveRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import Modal from "../../components/Modal/Modal";
import BackLink from "../../components/BackLink/BackLink";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleRecipe(id as string));
    dispatch(getSavedRecipes({userID, token}));
  }, [dispatch, id, token, userID]);

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
          <h3 className='text-3xl font-semibold text-gray-100 leading-tight'>
            {recipe?.name ? recipe?.name : "No Name"}
          </h3>
          <div className='flex mt-3'>
            <img
              src={recipe?.owner?.avatar}
              className='h-10 w-10 rounded-full mr-2 object-cover'
              alt={recipe?.owner?.name}
            />
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
      </div>
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
          dangerouslySetInnerHTML={{
            __html: recipe?.instructions
              ? recipe?.instructions
              : "No Instructions",
          }}
        />
        <div className='flex justify-between'>
          <div className=''>
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
      </div>
    </main>
  );
};

export default RecipeDetails;
