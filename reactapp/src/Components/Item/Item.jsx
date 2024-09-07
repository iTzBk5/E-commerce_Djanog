import React from 'react';
import './Item.css';

const Item = ({ id, name, image, price, is_sale, sale_price }) => {
  return (
    <div className='item'>
      {is_sale && (
        <div className="badge">
          Sale
        </div>
      )}
      <img src={image} alt={name} />
      <h2>{name}</h2>
      {is_sale ? (
        <div className='item-prices'>
          <strike><p className="original-price">${price}</p></strike>
          <p className="sale-price">Sale: ${sale_price}</p>
        </div>
      ) : (
        <p className="sale-price">${price}</p>
      )}
    </div>
  );
};

export default Item;
