import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Popular.css';
import Item from '../Item/Item';
import { Link } from 'react-router-dom';

export const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.name === "pink t-shirt" || product.name === "black vest" || product.name === "bleu t-shirt"
  );

  return (
    <div className='popular'>
      <h1>POPULAR</h1>
      <hr />
      <div className='popular-item'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className='popular-item'>
              <Item
                id={product.id}
                name={product.name}
                image={`http://localhost:8000${product.image}`}
                price={product.price}
                is_sale={product.is_sale}
                sale_price={product.sale_price}
              />
            </Link>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};
