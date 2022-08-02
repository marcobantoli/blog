import React from 'react'

function Navbar() {
  return (
    <nav>
      <div className="logo">Blog</div>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Create</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;