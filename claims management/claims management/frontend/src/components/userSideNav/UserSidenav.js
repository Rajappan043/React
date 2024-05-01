import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./userSideNav.css";

const UserSideNav = () => {
  return (
    <div className="app-side-nav bg-primary">
      <nav className="side-nav-content">
        <ul className="nav-list">
          <li className="nav-list-item">
            <i class="fa-solid fa-users"></i>
            <span>
              <Link to="profile">Profile</Link>
            </span>
          </li>

          <li className="nav-list-item">
            <i class="fa-solid fa-file-circle-plus"></i>
            <span>
              <Link to="newRequest">Claim Request</Link>
            </span>
          </li>

          <li className="nav-list-item">
            <i class="fa-solid fa-magnifying-glass"></i>
            <span>
              <Link to="claim">All Claims</Link>
            </span>
          </li>

          <li className="nav-list-item" style={{marginTop:"390px"}}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <span>
              <Link to="/logout">Log Out</Link>
            </span>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default UserSideNav;
