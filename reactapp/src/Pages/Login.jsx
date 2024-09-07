import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth
import './CSS/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful', data);
        login(); // Update the auth state
        navigate('/'); // Redirect to homepage
      } else {
        console.error('Login failed', data);
        // Handle login failure (e.g., show an error message)
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle request error (e.g., show an error message)
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
    <form onSubmit={handleSubmit}>
      <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit'>Continue</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
