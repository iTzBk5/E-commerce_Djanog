import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) };
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find((product) => product.id === Number(item));
        if (itemInfo) {
          // Use sale price if available, otherwise use regular price
          const itemPrice = itemInfo.is_sale ? itemInfo.sale_price : itemInfo.price;
          totalAmount += itemPrice * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  useEffect(() => {
    axios.get('https://e-commercedjanog-production.up.railway.app/api/products/')
      .then(response => {
        setProducts(response.data);

        // Initialize cartItems from localStorage
        const storedCartItems = localStorage.getItem('cartItems');
        const defaultCart = storedCartItems ? JSON.parse(storedCartItems) : {};
        
        // Initialize cartItems state with the stored cartItems
        setCartItems(defaultCart);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <ShopContext.Provider value={{ getTotalCartItems, getTotalCartAmount, products, cartItems, addToCart, removeFromCart }}>
      {props.children}
    </ShopContext.Provider>
  );
};
