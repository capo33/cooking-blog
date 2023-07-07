import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getCategoryBySlug } from "../../redux/feature/Category/categorySlice";
import { subStringFunc } from "../../utils";

const CategoryDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { category } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategoryBySlug(slug as string));
  }, [dispatch, slug]);

  return (
    <section className='bg-white container px-6 py-10 mx-auto'>
      <h1 className='text-center m-5 text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white'>
        {category?.name}
      </h1>
      <div className='flex justify-center'>
        <img
          className='object-cover max-w-screen-lg w-full h-56 rounded-lg'
          src={category?.image}
          alt={category?.name}
        />
      </div>

      <div className='grid grid-cols-1 gap-6 mt-16 md:grid-cols-2'>
        {category?.recipes?.map((recipe) => (
          <div
            className='max-w-xl rounded-lg shadow lg:flex md:flex '
            key={recipe?._id}
          >
            <img
              className='object-cover w-full md:w-1/2 lg:w-1/3'
              src={recipe?.image}
              alt={recipe?.name}
            />
            <Link to={`/recipe-details/${recipe?.slug}`}>
              <div className='px-6 py-4'>
                <h4 className='mb-3 text-base font-semibold'>{recipe?.name}</h4>
                <p className='mb-2 text-sm leading-normal text-justify'>
                  {subStringFunc(recipe?.instructions, 30)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryDetails;
