import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';  // Keep your custom CSS file

const LoginSignup = () => {
  const [username, setUsername] = useState('');  // Use username instead of name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});  // For capturing backend errors
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/loginsignup/', { // Ensure this matches your Django route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          username,
          email,
          first_name: '',
          last_name: '',
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Signup failed', errorData);
        setErrors(errorData.errors || {});
        return;
      }
  
      const data = await response.json();
      console.log('Signup successful', data);
      navigate('/login');
    } catch (error) {
      console.error('An error occurred:', error);
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

  return (
    <form onSubmit={handleSignup}>
      <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}  // Username input
            />
            {errors.username && <p className="error">{errors.username}</p>}

            <input
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password1 && <p className="error">{errors.password1}</p>}  {/* Display password error */}
          </div>
          <button type='submit'>Continue</button>
          <p className='loginsignup_login'>
            Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
          </p>
          <div className="loginsignup-agree">
            <input type='checkbox' id='agree' />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginSignup;
