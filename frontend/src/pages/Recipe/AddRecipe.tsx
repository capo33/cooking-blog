import React, { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import { createRecipe } from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { Recipe } from "../../interfaces/RecipeInterface";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";
import axios from "axios";
import { toast } from "react-toastify";
import Category from "../../components/RecipeForm/Category";
import Ingredients from "../../components/RecipeForm/Ingredients";
import CookingTime from "../../components/RecipeForm/CookingTime";
import Instructions from "../../components/RecipeForm/Instructions";
import RecipeName from "../../components/RecipeForm/RecipeName";
import UploadPicture from "../../components/RecipeForm/UploadPicture";
import RecipeButton from "../../components/RecipeForm/RecipeButton";

const AddRecipe = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    ingredients: [],
    instructions: "",
    image: "",
    cookingTime: 0,
    category: { _id: "", name: "", slug: "" },

    owner: {
      _id: user?._id as string,
    },
  });
  const [uploading, setUploading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // useEffect(() => {
  //   if (recipe) {
  //     const defaultIngredient = recipe.ingredients as string[];

  //     defaultIngredient.map((ingredient) => {
  //      return setRecipe((prevRecipe) => ({
  //         ...prevRecipe,
  //         ingredients: [...prevRecipe.ingredients, ingredient],
  //       }));
  //     });
  //   }
  // }, [recipe]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, inputValue],
    }));
    setInputValue("");
  };

  const handleDelete = (ingredient: string) => {
    const newIngredients = recipe.ingredients.filter(
      (ing) => ing !== ingredient
    );
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const addIngredient = () => {
    // we are updating the ingredients array by adding a new empty string
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // we need to copy the array and then update the value at the index we want to update with the new value

    const ingredients = [...recipe.ingredients];
    ingredients[index] = e.target.value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createRecipe({ formData: recipe, token }));
    navigate("/");
    setRecipe({
      name: "",
      ingredients: [],
      instructions: "",
      image: "",
      cookingTime: 0,
      category: { _id: "", name: "", slug: "" },
      owner: {
        _id: user?._id as string,
      },
    });
  };

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
      console.log("response", response.data.image);
      setRecipe({ ...recipe, image: response.data.image });
      setUploading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setUploading(false);
    }
  };

  return (
    <div>
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
                <RecipeName recipe={recipe} handleChange={handleChange} />
                <Instructions recipe={recipe} handleChange={handleChange} />
                <CookingTime recipe={recipe} handleChange={handleChange} />
                <Category recipe={recipe} handleChange={handleChange} />
                <Ingredients
                  recipe={recipe}
                  handleDelete={handleDelete}
                  handleClick={handleClick}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
                <UploadPicture
                  handleUpload={handleUpload}
                  uploading={uploading}
                />
              </div>
              <RecipeButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
