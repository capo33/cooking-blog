import React, { useCallback, useEffect } from "react";

import Lentil from "../../assets/images/Lentil-Soup.jpg";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

// import "./recipeCard.css";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getAllRecipes } from "../../redux/feature/Recipe/recipeSlice";
import { Recipe } from "../../interfaces/RecipeInterface";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className='col-lg-3 card'>
      <img src={recipe?.image} className='card-img-top' alt='...' />
      <div className='card-body'>
        <h5 className='card-title'>Card title</h5>
        <p className='card-text'>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
        <p className='card-text'>
          <small className='text-body-secondary'>Last updated 3 mins ago</small>
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
