import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./redux/app/store";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AddRecipe from "./pages/Recipe/AddRecipe";
import RecipeDetails from "./pages/Recipe/RecipeDetails";
import Nav from "./components/Nav";

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className='container mx-auto py-10 px-5'>
      <Router>
        {/* <Nav /> */}
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add-recipe' element={<AddRecipe />} />
          <Route path='/recipe-details/:id' element={<RecipeDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
