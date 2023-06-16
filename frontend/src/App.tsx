import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./redux/app/store";
import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AddRecipe from "./pages/AddRecipe";

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
