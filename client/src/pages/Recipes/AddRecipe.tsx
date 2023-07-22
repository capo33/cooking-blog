import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import FileBase from "react-file-base64";
import "react-quill/dist/quill.snow.css";

import { Recipe } from "../../interfaces/RecipeInterface";
import Category from "../../components/RecipeForm/Category";
import RecipeName from "../../components/RecipeForm/RecipeName";
import { userProfile } from "../../redux/feature/Auth/authSlice";
import CookingTime from "../../components/RecipeForm/CookingTime";
import Ingredients from "../../components/RecipeForm/Ingredients";
// import Instructions from "../../components/RecipeForm/Instructions";
import RecipeButton from "../../components/RecipeForm/RecipeButton";
import { createRecipe } from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";
import Editor from "../../components/Editor/Editor";

const AddRecipe = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState("");
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    ingredients: [],
    instructions: "",
    image: "",
    cookingTime: 0,
    category: { _id: "", name: "", image: "", slug: "" },

    owner: {
      _id: user?._id as string,
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, token]);

  // Get user profile
  useEffect(() => {
    dispatch(userProfile(token));
  }, [dispatch, token]);

  // Click handler for adding ingredients
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, inputValue],
    }));
    setInputValue("");
  };

  // Click handler for deleting ingredients
  const handleDelete = (ingredient: string) => {
    const newIngredients = recipe.ingredients.filter(
      (ing) => ing !== ingredient
    );
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  // Change handler for input field
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

  // Submit handler for form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createRecipe({ formData: recipe, token, toast }));
    navigate("/");
    setRecipe({
      name: "",
      ingredients: [],
      instructions: "",
      image: "",
      cookingTime: 0,
      category: { _id: "", name: "", image: "", slug: "" },
      owner: {
        _id: user?._id as string,
      },
    });
  };

  return (
    // <div className='mt-12 mb-5'>
    //   <div className='md:grid md:grid-cols-3 md:gap-6'>
    //     <div className='md:col-span-1'>
    //       <div className='px-4 sm:px-0'>
    //         <h3 className='p-5 text-lg font-medium leading-6 text-gray-900'>
    //           Create your recipe and share it to the world!
    //         </h3>
    //         <p className='px-5 text-sm text-gray-600'>
    //           "Cooking is like painting or writing a song. Just as there are
    //           only so many notes or colors, there are only so many flavors—it’s
    //           how you combine them that sets you apart."
    //         </p>
    //       </div>
    //     </div>
    //     <div className='mt-5 md:mt-0 md:col-span-2'>
    //       <form onSubmit={handleSubmit}>
    //         <div className='shadow sm:rounded-md sm:overflow-hidden'>
    //           <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
    //             <RecipeName recipe={recipe} handleChange={handleChange} />
    //             <Ingredients
    //               recipe={recipe}
    //               handleDelete={handleDelete}
    //               handleClick={handleClick}
    //               inputValue={inputValue}
    //               setInputValue={setInputValue}
    //             />
    //             {/* <Instructions recipe={recipe} handleChange={handleChange} /> */}
    //             <Editor
    //               recipe={recipe}
    //               onChange={(value: string) =>
    //                 setRecipe({ ...recipe, instructions: value })
    //               }
    //             />
    //             <CookingTime recipe={recipe} handleChange={handleChange} />
    //             <Category recipe={recipe} handleChange={handleChange} />
    //             <div className='flex flex-col items-center justify-center w-full'>
    //               <img src={recipe.image} className='w-1/2' alt={recipe?.name} />
    //               <label className='w-full p-2 text-sm font-medium text-gray-700'>
    //                 Upload image
    //               </label>
    //               <div className='w-full'>
    //                 <FileBase
    //                   type='file'
    //                   multiple={false}
    //                   onDone={({ base64 }: any) =>
    //                     setRecipe({ ...recipe, image: base64 })
    //                   }
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           <RecipeButton title='Add recipe' />
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className='container px-md-5 bg-white shadow-lg'>
      <div className='px-4 py-5 my-5 text-center'>
        <h1 className='display-5 fw-bold'>Submit Your Recipe</h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>
            Share your amazing recipies with thousands of web developers accross
            the world. Fill our form to get started.
          </p>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-8'>
          <form>
            <div className='row g-3'>
              <div className='col-12'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='form-control'
                />
              </div>
              <div className='col-12'>
                <label htmlFor='name' className='form-label'>
                  Recipe Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='form-control'
                />
              </div>
              <div className='col-12'>
                <label htmlFor='description' className='form-label'>
                  Description
                </label>
                <textarea
                  name='description'
                  id='description'
                  className='form-control'
                  cols={30}
                  rows={4}
                  defaultValue={""}
                />
              </div>
              <div className='col-12'>
                <label htmlFor='name' className='form-label'>
                  Ingredients
                </label>
                <br />
                <small>Example: Ice</small>
                <div className='ingredientList'>
                  <div className='ingredeintDiv mb-1'>
                    <input
                      type='text'
                      name='ingredients'
                      className='form-control'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='col-12'>
                <button
                  type='button'
                  className='btn btn-outline-primary'
                  id='addIngredientsBtn'
                >
                  + Ingredient
                </button>
              </div>
              <div className='col-12'>
                <label htmlFor='category'>Select Category</label>
                <select
                  className='form-select form-control'
                  name='category'
                  aria-label='Category'
                >
                  <option selected>Select Category</option>
                  <option value='Thai'>Thai</option>
                  <option value='American'>American</option>
                  <option value='Chinese'>Chinese</option>
                  <option value='Mexican'>Mexican</option>
                  <option value='Indian'>Indian</option>
                </select>
              </div>
              <div className='col-12'>
                <label htmlFor='image'>Product Image</label>
                <input
                  type='file'
                  className='form-control'
                  name='image'
                  accept='image/*'
                />
              </div>
              <div className='col-12'>
                <button type='submit' className='btn btn-primary'>
                  Submit Recipe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
