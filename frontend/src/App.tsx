import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AddRecipe from "./pages/Recipe/AddRecipe";
import ComplexNavbar from "./components/Navbar/ComplexNavbar";
import RecipeDetails from "./pages/Recipe/RecipeDetails";
import UpdateRecipe from "./pages/Recipe/UpdateRecipe";
import SavedRecipes from "./pages/Recipe/SavedRecipes";
import UpdateProfile from "./pages/UserProfile/UpdateProfile";
import Profile from "./pages/UserProfile/Profile";
import PrivateRoute from "./components/Guards/PrivateRoute";
import { GuestProfile } from "./pages/UserProfile/GuestProfile";
import Categories from "./pages/Category/Categories";
import AddCategory from "./pages/Category/admin/AddCategory";
import AdminRoute from "./components/Guards/AdminRoute";
import CategoryDetails from "./pages/Category/CategoryDetails";
import AllCategoriesForAdmin from "./pages/Category/admin/AllCategoriesForAdmin";
import CategoryDetailsForAdmin from "./pages/Category/admin/CategoryDetailsForAdmin";
import { useAppSelector } from "./redux/app/store";

function App() {
  const {user} = useAppSelector((state) => state.auth);
  const admin = user?.role;
   
  return (
    <div className='container mx-auto py-10 px-5 bg-white min-h-screen'>
      <Router>
        <ComplexNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/recipe-details/:id' element={<RecipeDetails />} />
          <Route path='/saved-recipes' element={<SavedRecipes />} />
          <Route path='/user-profile/:guestID' element={<GuestProfile />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/category/:slug' element={<CategoryDetails />} />

          <Route path='' element={<PrivateRoute />}>
            <Route path='/add-recipe' element={<AddRecipe />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/update-recipe/:recipeId' element={<UpdateRecipe />} />
            <Route path='/update-profile/:id' element={<UpdateProfile />} />
          </Route>

            <Route path='/admin/allcategories' element={<AllCategoriesForAdmin />} />
          <Route path='' element={<AdminRoute />}>
            <Route path='/admin/add-category' element={<AddCategory />} />
            <Route
              path='/admin/edit-category/:slug'
              element={<CategoryDetailsForAdmin />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
