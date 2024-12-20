import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Gym App</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>
        <li>
          <Link to="/about-gym">About the Gym</Link>
        </li>
        <li>
          <Link to="/about-trainers">About Trainers and Owners</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
