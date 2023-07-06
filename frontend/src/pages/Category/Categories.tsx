import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

import BackLink from "../../components/BackLink/BackLink";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";

const Categories = () => {
  const { categories, isLoading } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const capitalize = (str: string) => {
    return str.charAt(0)?.toUpperCase() + str.slice(1);
  };

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12'>
      <article>
        <h2 className='text-2xl font-extrabold text-gray-900'>Categories</h2>
        {isLoading && <div>Loading...</div>}
        <section className='mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8'>
          {categories?.length === 0 && (
            <div className='flex justify-center items-center'>
              <h1 className='text-2xl text-gray-500'>No categories found</h1>
            </div>
          )}
          {categories?.map((category) => (
            <article
              key={category._id}
              className='relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out'
              style={{
                backgroundImage: `url(${category.image})`,
              }}
            >
              <div className='absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out' />
              <div className='relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center'>
                <h3 className='text-center'>
                  <Link
                    to={`/category/${category.slug}`}
                    className='text-white text-2xl font-bold text-center'
                  >
                    <span className='absolute inset-0' />
                    {capitalize(category.name)}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </section>
      </article>
    </section>
  );
};

export default Categories;
