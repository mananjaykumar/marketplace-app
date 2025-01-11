import React, { useState } from "react";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">MarketPlace</div>
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`menu ${isOpen ? "menu-open" : ""}`}>
        <li>
          <a href="/" className="menu-item">
            Home
          </a>
        </li>
        <li>
          <a href="/orders" className="menu-item">
            Orders
          </a>
        </li>
        {/* <li>
          <a href="#services" className="menu-item">
            Services
          </a>
        </li>
        <li>
          <a href="#contact" className="menu-item">
            Contact
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
