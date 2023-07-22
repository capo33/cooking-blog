import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import Loader from "../Loader/Index";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";

import "./category.css";

const Category = () => {
  const { categories, isLoading } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  // we use useCallback to prevent infinite loop
  const getCategories = useCallback(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    getCategories();
  }, [getAllCategories]);

  return (
    <div className='row row-cols-2 row-cols-lg-6 g-2 g-lg-3 py-4'>
      {isLoading && <Loader />}
      {categories.length === 0 && !isLoading && (
        <h2 className='text-center'>No Categories Found</h2>
      )}

      {categories.map((category) => (
        <Link
          to={`/categories/${category?._id}`}
          className='col text-center category__link'
          key={category?._id}
        >
          <div className='category__img shadow'>
            <img src={category?.image} alt={category?.name} loading='lazy' />
          </div>
          <div className='pt-1'>{category?.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
