import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Pages/AuthContext.jsx'; // Import AuthProvider

import Shop from './Pages/Shop.jsx';
import ShopCategory from './Pages/ShopCategory.jsx';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import Login from './Pages/Login.jsx';
import LoginSignup from './Pages/LoginSignup.jsx';
import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer.jsx';
import men_benner from './Components/Assets/banner_mens.png'
import kid_banner from './Components/Assets/banner_kids.png'
import women_banner from './Components/Assets/banner_women.png'


function App() {
  return (
    <AuthProvider> {/* Wrap your application with AuthProvider */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_benner} category="mens" />} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kids" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
