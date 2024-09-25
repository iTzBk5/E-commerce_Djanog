import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CSS/Products.css';
import { ShopContext } from '../Context/ShopContext';

const Product = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null);
  const {addToCart} = useContext(ShopContext);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${productId}/`) // Adjust the URL based on your setup
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product details!', error);
      });
  }, [productId]);



  if (!product) return <div>Loading...</div>;

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt={product.name}></img>
          <img src={product.image} alt={product.name}></img>
          <img src={product.image} alt={product.name}></img>
          <img src={product.image} alt={product.name}></img>
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt={product.name}></img>
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          {/* Add star rating here */}
        </div>
        <div className="productdisplay-right-prices">
          {product.is_sale ? (
            <div>
              <div className="productdisplay-right-price-old">${product.price}</div>
              <div className="productdisplay-right-price-new">Sale Price: ${product.sale_price}</div>
            </div>
          ) : (
            <div className="productdisplay-right-price-old2">${product.price}</div>
          )}
        </div>
        <div className="productdisplay-right-description">{product.description}</div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        
        <button onClick={()=>{addToCart(product.id)}} >ADD TO CART</button>
      </div>
    </div>
  );
};

export default Product;
