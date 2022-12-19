import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar({ user, handleLogout }) {
  return (
    <>
      <nav className="nav-bar">
        <div className="logo">rouger</div>
        <ul>
          { user.username !== '' ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <li>
                <Link to="/">Posts</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <hr/>
    </>
  );
}

export default Navbar;
