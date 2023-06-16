import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createRecipe } from "../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import { Recipe } from "../interfaces/RecipeInterface";


const AddRecipe = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    ingredients: [],
    instructions: "",
    image: "",
    cookingTime: 0,
    category: "",

    owner: {
      _id: user?._id as string
    }
   });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  console.log(token);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // navigate("/");
    setRecipe({
      name: "",
      ingredients: [],
      instructions: "",
      image: "",
      cookingTime: 0,
      category: "",
      owner: {
        _id: user?._id as string
      }
    });
  };
  return <div>AddRecipe</div>;
};

export default AddRecipe;
