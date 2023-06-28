import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Cart from './Component/Cart/Cart';
import Favourite from './Component/Favourite/Favourite';
import Product from './Component/Product/Product';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favourite" element={<Favourite/>} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}

