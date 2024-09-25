import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from 'C:/Users/Bk/Documents/.venv/project/ecommerce/reactapp/src/Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import { Link } from 'react-router-dom';

const ShopCategory = (props) => {
  const { products } = useContext(ShopContext); // Destructure to get products from context

  // Safety check: Ensure products is an array
  const filteredProducts = Array.isArray(products)
    ? products.filter(item => item.category === props.category)
    : [];

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt='' />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt='' />
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id} className='itemcss'>
              <Item
                id={item.id}
                name={item.name}
                image={`http://127.0.0.1:8000/${item.image}`} // Adjust the image path as needed
                price={item.price}
                sale_price={item.sale_price}
                is_sale={item.is_sale}
              />
            </Link>
          ))
        ) : (
          <p>No products available in this category</p>
        )}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
