import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./Components/Guards/PrivateRoute";
import AdminRoute from "./Components/Guards/AdminRoute";
import { Header } from "./Components/Header/Index";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Index";
import AddCategory from "./pages/Categories/admin/AddCategory";
import AddRecipe from "./pages/Recipes/AddRecipe";

function App() {
  return (
    <div>
      <Router>
        {/* <ScrollToTop /> */}
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
            <Route path='/add-recipe' element={<AddRecipe />} />
            {/* 
          <Route path='/saved-recipes' element={<SavedRecipes />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/update-recipe/:recipeId' element={<UpdateRecipe />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} /> */}
          </Route>

          {/* AdminRoutes */}
          <Route path='' element={<AdminRoute />}>
            <Route path='/admin/add-category' element={<AddCategory />} />
            {/*
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
