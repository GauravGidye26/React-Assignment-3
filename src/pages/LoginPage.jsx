import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login.jsx';
import AuthContext from '../contexts/AuthContext';

const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const delay = 2000; 
      const timeoutId = setTimeout(() => {
        navigate('/dashboard'); 
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h3>Welcome! You are logged in.</h3>
          <p>You will be redirected to Dashboard in a few seconds!</p>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default LoginPage;
