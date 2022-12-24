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
            <>
              <Link className="link-nav" id="create-nav" to="/create">Create Post</Link>
              <Link className="link-nav" to="/me/posts">My Posts</Link>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <Link className="link-nav" to="/">Posts</Link>
              </li>
              <li>
                <Link className="link-nav" to="/login">Login</Link>
              </li>
              <li>
                <Link className="link-nav" to="/register">Register</Link>
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
