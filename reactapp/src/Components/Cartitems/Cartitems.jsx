import React, { useContext, useState, useRef, useEffect } from 'react';
import './Cartitems.css';
import { ShopContext } from 'C:/Users/Bk/Documents/.venv/project/ecommerce/reactapp/src/Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'C:/Users/Bk/Documents/.venv/project/ecommerce/reactapp/src/Pages/AuthContext'; // Import useAuth

export const Cartitems = () => {
  const { getTotalCartAmount, products, cartItems, removeFromCart } = useContext(ShopContext);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const checkoutFormRef = useRef(null);
  const navigate = useNavigate();
  const { authenticated } = useAuth();

  const handleProceedToCheckout = () => {
    if (authenticated) {
      setShowCheckoutForm(true);
    } else {
      alert('Please log in to proceed to checkout.');
      navigate('/login'); // Redirect to login page
    }
  };

  useEffect(() => {
    if (showCheckoutForm && checkoutFormRef.current) {
      checkoutFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCheckoutForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the products data
    const productsData = Object.keys(cartItems).map((productId) => {
      const quantity = cartItems[productId];
      // Only include products with quantity greater than 0
      if (quantity > 0) {
          return {
              product: parseInt(productId, 10), // Send product ID as integer
              quantity: quantity,
          };
      }
      return null;
  }).filter(item => item !== null);
  
  
    const formData = {
      first_name: e.target.firstName.value,
      last_name: e.target.lastName.value,
      address: e.target.address.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      total_amount: getTotalCartAmount().toFixed(2),
      products: productsData, // Ensure productsData matches the expected format
    };
  
    try {
      const response = await fetch('https://e-commercedjanog-production.up.railway.app/api/order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Order placed successfully!');
        setShowCheckoutForm(false); // Hide the form
      } else {
        alert('Failed to place the order.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while placing the order.');
    }
  };
  
  

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((product) => {
        if (cartItems[product.id] > 0) {
          const itemPrice = product.is_sale ? product.sale_price : product.price;
          const itemTotal = (itemPrice * cartItems[product.id]).toFixed(2);

          return (
            <div key={product.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={`https://e-commercedjanog-production.up.railway.app${product.image}`} alt="" className='carticon-product-icon' />
                <p>{product.name}</p>
                <p>${itemPrice}</p>
                <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                <p>${itemTotal}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(product.id)} alt="Remove" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount().toFixed(2)}</h3>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
      </div>

      {/* Conditionally render the checkout form */}
      {showCheckoutForm && (
        <div ref={checkoutFormRef} className="loginsignup-container">
          <div className="loginsignup-fields">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
              <label>
                First Name:
                <input type="text" name="firstName" required />
              </label>
              <br />
              <label>
                Last Name:
                <input type="text" name="lastName" required />
              </label>
              <br />
              <label>
                Address:
                <input type="text" name="address" required />
              </label>
              <br />
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <br />
              <label>
                Phone:
                <input type="tel" name="phone" required />
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
