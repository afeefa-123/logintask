import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/protected">Protected Route</Link>
        </li>
      </ul>
   
  );
};

export default Navigation;
