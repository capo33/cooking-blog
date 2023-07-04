import React from "react";

import { Recipe } from "../../interfaces/RecipeInterface";

type RecipeNameProps = {
  recipe: Recipe | null
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const RecipeName = ({ recipe, handleChange }: RecipeNameProps) => {
  return (
    <div>
      <label htmlFor='name' className='text-lg leading-6 font-medium'>
        Name
      </label>

      <input
        type='text'
        name='name'
        id='name'
        value={recipe?.name}
        onChange={handleChange}
        placeholder='Write a name for your recipe'
        className='shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md'
      />
    </div>
  );
};

export default RecipeName;
