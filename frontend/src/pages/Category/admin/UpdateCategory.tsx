import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileBase from "react-file-base64";

import {
  getCategoryBySlug,
  updateCategory,
} from "../../../redux/feature/Category/categorySlice";
import { ICategoryData } from "../../../interfaces/CategoryInterface";
import RecipeButton from "../../../components/RecipeForm/RecipeButton";
import { useAppDispatch, useAppSelector } from "../../../redux/app/store";

const UpdateCategory = () => {
  const { slug } = useParams<{ slug: string }>();

  const { user } = useAppSelector((state) => state.auth);
  const { category } = useAppSelector((state) => state.category);

  const categoryData = {
    name: (category?.name as string) || "",
    image: (category?.image as string) || "",
  };

  const [data, setData] = useState<ICategoryData>(categoryData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = user?.token as string;

  useEffect(() => {
    dispatch(getCategoryBySlug(slug as string));
  }, [dispatch, slug]);

  useEffect(() => {
    if (category) {
      setData(category as ICategoryData);
    }
  }, [category]);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        id: category?._id as string,
        categoryData: data,
        token,
        toast,
        navigate,
      })
    );
  };

  return (
    <div className='p-5 mt-10 max-w-md'>
      <div className='p-8 rounded border border-gray-200'>
        <h1 className='font-medium text-3xl'>Update Category</h1>
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
                value={data?.name as string}
                id='name'
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                placeholder='e.g. Sports'
              />
            </div>
          </div>
          <div className='mt-8'>
            <img src={data?.image as string} alt={data?.name} />
            <FileBase
              type='file'
              multiple={false}
              onDone={({ base64 }: any) =>
                setData({ ...data, image: base64 as string })
              }
            />

            {/* <UploadPicture handleUpload={handleUpload} uploading={uploading} /> */}
          </div>
          <div className='space-x-4 mt-8'>
            <RecipeButton title='Update' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
