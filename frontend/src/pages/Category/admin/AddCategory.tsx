import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";

import { Category } from "../../../interfaces/CategoryInterface";
import RecipeButton from "../../../components/RecipeForm/RecipeButton";
import { useAppSelector, useAppDispatch } from "../../../redux/app/store";
import { createCategory } from "../../../redux/feature/Category/categorySlice";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState<Category>({
    name: "",
    image: "",
  });

  const { user } = useAppSelector((state) => state.auth);

  const token = user?.token as string;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createCategory({
        categoryData,
        token,
        toast,
        navigate,
      })
    );

    setCategoryData({
      name: "",
      image: "",
    });
  };

  return (
    <>
      <div className='p-5 mt-10 max-w-md'>
        <div className='p-8 rounded border border-gray-200'>
          <h1 className='font-medium text-3xl'>Add Category</h1>
          <form onSubmit={handleSubmit}>
            <div className='mt-8 grid gap-4'>
              <div>
                <label
                  htmlFor='name'
                  className='text-sm text-gray-700 block mb-1 font-medium'
                >
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={categoryData.name}
                  id='name'
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, name: e.target.value })
                  }
                  className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                  placeholder='e.g. Sports'
                />
              </div>
            </div>
            <div className='mt-8'>
              <img src={categoryData?.image} alt={categoryData?.name} />
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }: any) =>
                  setCategoryData({ ...categoryData, image: base64 })
                }
              />
            </div>

            <div className=' mt-8'>
              <RecipeButton title='Add' />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
