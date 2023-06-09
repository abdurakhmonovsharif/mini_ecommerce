import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Router, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home";
import NotPage from "./components/pages/404/NotPage";
import Admin from "./components/pages/Admin/Admin";
import Basket from "./components/pages/Basket/Basket";
import Categories from "./components/pages/Caregories/Categories";
import Login from "./components/pages/Login/Login";
import Main from "./components/pages/Main/Main";
import Products from "./components/pages/Products/Products";
import Profile from "./components/pages/Profile/Profile";
import Register from "./components/pages/Register/Register";

function App() {
  const location = useLocation();
  const navigate = useNavigate()
  const openPages = ['/', 'basket', '/profile', '/categories', '/products', '/login', 'register', '/404']
  useEffect(() => {
    if (location.pathname == "/admin") {
      let token = localStorage.getItem("token");
      axios({
        url: `http://localhost:8080/users/checkuser?token=${token}`,
        method: "get"
      }).then(response => {
        if (response.data.data != "admin") {
          navigate("/404")
        }
      })
    }

  }, [location.pathname])
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="/" element={<Main />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/products" element={<Products />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/404" element={<NotPage />} />
    </Routes>
  );
}

export default App;
