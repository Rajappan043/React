import React from "react";
import "./Header.css";

const Navbar = () => {
  return (
    <div className="nav-bar">
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <div className="side-nav-button p-2 me-3 text-light">
          <i class="fa-regular fa-address-card"></i>
        </div>

        <a className="navbar-brand px-4">Claim Management System</a>


      </nav>
    </div>
  );
};

export default Navbar;
