import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AddRecipe from "./pages/Recipe/AddRecipe";
import ComplexNavbar from "./components/ComplexNavbar";
import RecipeDetails from "./pages/Recipe/RecipeDetails";
import { useAppSelector } from "./redux/app/store";
import UpdateRecipe from "./pages/Recipe/UpdateRecipe";
import SavedRecipes from "./pages/Recipe/SavedRecipes";
import Profile from "./pages/UserProfile/Profile";
import UpdateProfile from "./pages/UserProfile/UpdateProfile";

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className='container mx-auto py-10 px-5 bg-white'>
      <Router>
        <ComplexNavbar />
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/add-recipe'
            element={user ? <AddRecipe /> : <Login />}
          />
          <Route path='/recipe-details/:id' element={<RecipeDetails />} />
          <Route path='/update-recipe/:recipeId' element={<UpdateRecipe />} />
          <Route path='/saved-recipes' element={<SavedRecipes />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
