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

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className='container mx-auto py-10 px-5'>
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
          <Route path='/update-recipe/:id' element={<UpdateRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
