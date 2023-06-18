import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createRecipe } from "../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import { Recipe } from "../interfaces/RecipeInterface";
import { getAllCategories } from "../redux/feature/Category/categorySlice";
import axios from "axios";

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
  const [category, setCategory] = useState<string>("");
  const { categories } = useAppSelector((state) => state.category);
  const [uploading, setUploading] = useState(false);

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
    // setRecipe({
    //   name: "",
    //   ingredients: [],
    //   instructions: "",
    //   image: "",
    //   cookingTime: 0,
    //   category: "",
    //   owner: {
    //     _id: user?._id as string,
    //   },
    // });
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
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Add Recipe</h1>
      <form
        onSubmit={handleSubmit}
        className='my-20 p-10 max-w-xl mx-auto shadow-md sm:border-0 md:border md:border-gray-900 md:dark:border-gray-100 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
      >
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={recipe.name}
            onChange={handleChange}
            className='w-full border-2 border-gray-900 dark:border-gray-100 rounded-md p-2 my-2'
          />
        </div>
        <div>
          <label htmlFor='ingredients'>Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type='text'
              name='ingredients'
              value={ingredient}
              className='w-full border-2 border-gray-900 dark:border-gray-100 rounded-md p-2 my-2'
              onChange={(e) => handleIngredientChange(e, index)}
            />
          ))}
          <button
            type='button'
            onClick={addIngredient}
            className='w-full border-2 border-gray-900 dark:border-gray-100 rounded-md p-2 my-2'
          >
            Add Ingredient
          </button>
        </div>
        <div>
          <label htmlFor='instructions'>Instructions</label>
          <textarea
            name='instructions'
            value={recipe.instructions}
            className='w-full border-2 border-gray-900 dark:border-gray-100 rounded-md p-2 my-2'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='image'>Image</label>
          {/* <input
            type='text'
            name='image'
            value={recipe.image}
            onChange={handleChange}
            className='w-full border-2 border-gray-900 dark:border-gray-100 rounded-md p-2 my-2'
          /> */}
          <input
            type='file'
            name='image'
            onChange={handleUpload}
            className='w-full border-2 border-gray-900 dark:border-gray-100 rounded-md p-2 my-2'
          />
          {uploading && <p>Uploading image...</p>}
        </div>
        <div>
          <label htmlFor='cookingTime'>Cooking Time</label>
          <input
            type='number'
            name='cookingTime'
            value={recipe.cookingTime}
            onChange={handleChange}
            className='w-full border-2 border-gray-900 dark:border-gray-100 rounded-md p-2 my-2'
          />
        </div>
        <div>
          <label htmlFor='category'>Category</label>
          <select
            name='category'
            value={recipe.category._id}
            onChange={handleChange}
            className='w-full border-2 border-gray-900 dark:border-gray-100 rounded-md p-2 my-2'
          >
            <option value=''>Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type='submit'
          className='w-full border-2 bg-orange-600 border-gray-900 dark:border-gray-100 rounded-md p-2 my-2'
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
