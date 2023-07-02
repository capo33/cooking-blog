import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  EyeIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { Chip } from "@material-tailwind/react";

import { subStringFunc } from "../../utils";
import { Recipe } from "../../interfaces/RecipeInterface";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getSavedRecipes } from "../../redux/feature/Recipe/recipeSlice";

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
    dispatch(getSavedRecipes({ userID, token }));
  }, [dispatch, userID, token, user]);

  return (
    <Card className='w-full max-w-[26rem] shadow-lg' key={recipe?._id}>
      <CardHeader floated={false} color='blue-gray'>
        <img
          src={recipe?.image}
          alt={recipe?.name}
          className='object-cover w-full h-48 rounded-t-lg'
        />

        <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
        <IconButton
          size='sm'
          color='amber'
          variant='text'
          className='!absolute top-4 right-4 rounded-full'
        >
          <BookmarkIcon className='h-6 w-6' />
        </IconButton>
      </CardHeader>
      <CardBody>
        <div className='mb-3 flex items-center justify-between'>
          <Typography variant='h5' color='blue-gray' className='font-medium'>
            {recipe?.name}
          </Typography>

          {recipesIDs?.includes(recipe._id) ? (
            <Chip variant='ghost' color='green' size='sm' value='Saved' />
          ) : (
            <Chip variant='ghost' size='sm' color='red' value='Not Saved' />
          )}
        </div>
        <Typography color='gray'>
          {subStringFunc(recipe?.instructions, 40)}
        </Typography>
        <div className='group mt-8 flex justify-around items-center gap-3'>
          <Tooltip
            content={`${recipe?.rating} ${
              recipe?.rating === 1 ? "star" : "stars"
            }`}
          >
            <span className='cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70'>
              <StarIcon className='h-5 w-5' />
            </span>
          </Tooltip>
          <Tooltip
            content={`${recipe?.views} ${
              recipe?.views === 1 ? "view" : "views"
            }`}
          >
            <span className='cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70'>
              <EyeIcon className='h-5 w-5' />
            </span>
          </Tooltip>
          <Tooltip
            content={`${recipe?.reviews?.length} ${
              recipe?.reviews?.length === 1 ? "reviews" : "review"
            }`}
          >
            <span className='cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70'>
              <ChatBubbleLeftRightIcon className='h-5 w-5' />
            </span>
          </Tooltip>
          <Tooltip
            content={`${recipe?.likes?.length} ${
              recipe?.likes?.length === 1 ? "like" : "likes"
            }`}
          >
            <span className='cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70'>
              <HandThumbUpIcon className='h-5 w-5' />
            </span>
          </Tooltip>
        </div>
      </CardBody>
      <CardFooter className='pt-3'>
        <Button size='lg' fullWidth={true} className='bg-teal-400'>
          <Link
            to={`/recipe/${recipe?._id}`}
            className='flex items-center justify-center gap-2'
          >
            <span>View Recipe</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BLogCard;
