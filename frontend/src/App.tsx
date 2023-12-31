import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AddRecipe from "./pages/Recipe/AddRecipe";
import Profile from "./pages/UserProfile/Profile";
import Categories from "./pages/Category/Categories";
import UpdateRecipe from "./pages/Recipe/UpdateRecipe";
import SavedRecipes from "./pages/Recipe/SavedRecipes";
import AdminRoute from "./components/Guards/AdminRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import RecipeDetails from "./pages/Recipe/RecipeDetails";
import PrivateRoute from "./components/Guards/PrivateRoute";
import AddCategory from "./pages/Category/admin/AddCategory";
import UpdateProfile from "./pages/UserProfile/UpdateProfile";
import ComplexNavbar from "./components/Navbar/ComplexNavbar";
import CategoryDetails from "./pages/Category/CategoryDetails";
import { GuestProfile } from "./pages/UserProfile/GuestProfile";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import UpdateCategory from "./pages/Category/admin/UpdateCategory";
import AllCategoriesForAdmin from "./pages/Category/admin/AllCategoriesForAdmin";
import { Header } from "./components/Header/Index";

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        {/* <ComplexNavbar /> */}

        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/recipe-details/:id' element={<RecipeDetails />} />
          <Route path='/user-profile/:guestID' element={<GuestProfile />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/category/:slug' element={<CategoryDetails />} /> */}

          {/* PrivateRoutes */}
          <Route path='' element={<PrivateRoute />}>
            {/* <Route path='/add-recipe' element={<AddRecipe />} />
            <Route path='/saved-recipes' element={<SavedRecipes />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/update-recipe/:recipeId' element={<UpdateRecipe />} />
            <Route path='/update-profile/:id' element={<UpdateProfile />} /> */}
          </Route>

          {/* AdminRoutes */}
          <Route path='' element={<AdminRoute />}>
            {/* <Route path='/admin/add-category' element={<AddCategory />} />
            <Route
              path='/admin/edit-category/:slug'
              element={<UpdateCategory />}
            />
            <Route
              path='/admin/all-categories'
              element={<AllCategoriesForAdmin />}
            /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
