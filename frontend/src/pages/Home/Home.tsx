import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GiRiceCooker } from "react-icons/gi";

import Landing from "./Landing";
import BLogCard from "../../components/BLogCard/BLogCard";
import { Recipe } from "../../interfaces/RecipeInterface";
import { getAllRecipes } from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const Home = () => {
  const { recipes } = useAppSelector((state) => state.recipe);
  const { user } = useAppSelector((state) => state.auth);
 
  const dispatch = useAppDispatch();

  const token = user?.token;
  const userID = user?._id;

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <>
      <section className='bg-white dark:bg-gray-900 mb-5'>
        <Landing />
        <h2>
          <div className='mx-auto px-5'>
            <div className=' flex justify-between'>
              <div className='text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-teal-600 uppercase'>
                <GiRiceCooker className='w-6 h-6 mr-3' />
                Recipes
              </div>
              <Link to='/' className='font-semibold inline-block'></Link>
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
  );
};

export default Home;
