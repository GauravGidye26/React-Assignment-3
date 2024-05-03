import React, { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      setIsLoggedIn(false);
	  navigate('/');
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Logout</h2>
      <button className="btn btn-danger" onClick={handleLogout} disabled={loggingOut}>
        Logout
      </button>
	  <hr/>
	  {loggingOut ? 'Logging User Out... You will be redirected to Home Page!' : ''}
    </div>
  );
};

export default Logout;
