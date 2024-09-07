import React, { useContext } from 'react';
import './Lastes.css';
import { ShopContext } from 'C:/Users/Bk/Documents/.venv/project/ecommerce/reactapp/src/Context/ShopContext';
import Item from '../Item/Item';
import { Link } from 'react-router-dom';

export const Lastes = () => {
  // Destructure products from the context
  const { products } = useContext(ShopContext);

  // Get the last 4 products by slicing from the end
  const filteredProducts = Array.isArray(products) ? products.slice(-4) : [];

  return (
    <div className='popular'>
      <h1>Lastes Collection</h1>
      <hr />
      <div className='popular-item'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className='popular-item'>
              <Item
                id={product.id}
                name={product.name}
                image={`https://e-commercedjanog-production.up.railway.app${product.image}`} // Adjust the image path as needed
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
