import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import AuthContext from '../contexts/AuthContext.jsx';

const NavigationBar = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Nav variant="pills" defaultActiveKey="/" justify="start">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      {isLoggedIn ? (
        <>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/dashboard">
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/logout">
              Logout
            </Nav.Link>
          </Nav.Item>
        </>
      ) : (
        <Nav.Item>
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default NavigationBar;
