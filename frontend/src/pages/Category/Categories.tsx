import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

import BackLink from "../../components/BackLink/BackLink";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";

const Categories = () => {
  const { categories, isLoading } = useAppSelector((state) => state.category);

  console.log(categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className='container px-5 py-10 mx-auto'>
      <BackLink link='/' name='Home' />
      <div className='bg-white rounded-lg shadow-lg p-4'>
        <Link
          to={"/create-category"}
          className='inline-flex items-center bg-blue-500 p-2 rounded text-white hover:bg-blue-800 focus:outline-none'
        >
          {/* <IoCreateSharp className='h-5 w-5 mr-1' /> */}
          <span className='text-lg'>Create new Category</span>
        </Link>
        <div className='flex flex-col justify-around'>
          <div className='flex flex-wrap col justify-around'>
            <span className='text-lg '>Categories </span>
            {isLoading && <div>Loading...</div>}
          </div>
          <hr className='my-4' />
              {categories?.map((category) => (
                //   <>
                //     {console.log(category.image)}
                //   <tr key={category._id}>
                //     <td className='border px-4 py-2'>
                //       {/* {capitalize(category.name)} */}
                //       <img src={category.image} alt={category.name} className="h-10 w-10 rounded-full" />
                //     </td>
                //     <td className='border px-4 py-2'>
                //       <Link
                //         to={`/category/${category.slug}`}
                //         className='text-center inline-flex  justify-center text-gray-700 hover:text-gray-900 focus:outline-none'
                //       >
                //         <AiFillEdit className='h-5 w-5 mr-1' />
                //         <span className='text-sm'>Edit</span>
                //       </Link>
                //     </td>
                //   </tr>
                // </>
                <img
                  src={category.image}
                  alt={category.name}
                  className='h-10 w-10 rounded-full'
                />
              ))}
          <table className='text-center'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
