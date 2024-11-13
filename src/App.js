import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './common/NavBar';
import HomePage from './components/home/homePage';
import Login from './components/login/login';
import SignUpPage from './components/signUp/signUpPage';
import AddProductPage from './components/addProducts/addProducts';
import ProductsPage from './components/products/products';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
