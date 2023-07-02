import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeName from "../../components/RecipeForm/RecipeName";
import Ingredients from "../../components/RecipeForm/Ingredients";
import Instructions from "../../components/RecipeForm/Instructions";
import CookingTime from "../../components/RecipeForm/CookingTime";
import Category from "../../components/RecipeForm/Category";
import UploadPicture from "../../components/RecipeForm/UploadPicture";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import {
  getSingleRecipe,
  updateRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import { Recipe } from "../../interfaces/RecipeInterface";
import axios from "axios";
import { toast } from "react-toastify";
import RecipeButton from "../../components/RecipeForm/RecipeButton";
import BackLink from "../../components/BackLink/BackLink";

const UpdateRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const { recipe } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  const recipeData = {
    name: recipe?.name as string,
    ingredients: recipe?.ingredients as string[],
    instructions: recipe?.instructions as string,
    image: recipe?.image as string,
    cookingTime: recipe?.cookingTime as number,
    category: { _id: "", name: "", image: "", slug: "" },
    owner: {
      _id: user?.result?._id as string,
    },
    // name: "",
    // ingredients: [],
    // instructions: "",
    // image: "",
    // cookingTime: 0,
    // category: { _id: "", name: "", image: "", slug: "" },

    // owner: {
    //   _id: user?.result?._id as string,
    // },
  };

  const [data, setData] = useState<Recipe>(recipeData);
  const [uploading, setUploading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(getSingleRecipe(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    if (recipe) {
      setData(recipe as Recipe);
    }
  }, [recipe]);

  // Handle change for all input fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  // Click handler for adding ingredients
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setData((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, inputValue],
    }));
    setInputValue("");
  };

  // Click handler for deleting ingredients
  const handleDelete = (ingredient: string) => {
    const newIngredients = data.ingredients.filter((ing) => ing !== ingredient);
    console.log(newIngredients);

    setData((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredients as string[],
    }));
    console.log(ingredient);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateRecipe({
        recipeID: id as string,
        formData: data as Recipe,
        token,
        toast,
        navigate,
      })
    );
    setData(recipeData);
  };

  // Upload image handler
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.currentTarget?.files?.[0];
    const formData = new FormData();
    formData.append("image", file as Blob);
    setUploading(true);
    try {
      const response = await axios.post("/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevRecipe) => ({
        ...prevRecipe,
        image: response.data.image,
      }));
      setUploading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setUploading(false);
    }
  };

  return (
    <div className='mt-12 mb-5'>
      <BackLink link='/' name='edit-recipe' />
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <div className='px-4 sm:px-0'>
            <h3 className='p-5 text-lg font-medium leading-6 text-gray-900'>
              Create your recipe and share it to the world!
            </h3>
            <p className='px-5 text-sm text-gray-600'>
              "Cooking is like painting or writing a song. Just as there are
              only so many notes or colors, there are only so many flavors—it’s
              how you combine them that sets you apart."
            </p>
          </div>
        </div>
        <div className='mt-5 md:mt-0 md:col-span-2'>
          <form onSubmit={handleSubmit}>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                <RecipeName recipe={data} handleChange={handleChange} />
                <Ingredients
                  recipe={data}
                  handleDelete={handleDelete}
                  handleClick={handleClick}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />

                <Instructions recipe={data} handleChange={handleChange} />
                <CookingTime recipe={data} handleChange={handleChange} />
                <Category recipe={data} handleChange={handleChange} />
                <UploadPicture
                  handleUpload={handleUpload}
                  uploading={uploading}
                />
                <img src={data?.image} alt='' className='w-1/2 h-1/2' />
              </div>
              {/* <RecipeButton /> */}
              <RecipeButton title='Updata' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipe;
