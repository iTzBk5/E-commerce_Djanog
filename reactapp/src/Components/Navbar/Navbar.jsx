import React, { useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { useAuth } from 'C:/Users/Bk/Documents/.venv/project/ecommerce/reactapp/src/Pages/AuthContext'; // Import useAuth
import { ShopContext } from '../../Context/ShopContext';

export const Navbar = () => {
  const { authenticated, logout } = useAuth();
  const [menu, setMenu] = useState("shop");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/logout/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
      });
      logout(); // Update the auth state
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const {getTotalCartItems} = useContext(ShopContext);
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt='' />
        <p>SHOPPER</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none',color: 'inherit' }} to="/">Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("men") }}><Link style={{ textDecoration: 'none',color: 'inherit' }} to="/mens">Men</Link>{menu === "men" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("women") }}><Link style={{ textDecoration: 'none',color: 'inherit' }} to="/women">Women</Link>{menu === "women" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none',color: 'inherit' }} to="/kids">Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className='nav-login-cart'>
        {authenticated ? (
            <button onClick={handleLogout}>Logout</button>
        ) : (<>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/loginsignup"><button>Register</button></Link>
          </>
        )}
        <Link to="/cart"><img src={cart_icon} alt='' /></Link>
        <div className='nav-cart-count' id='cart_quantity'>{getTotalCartItems()}</div>
      </div>
    </div>
  );
};
