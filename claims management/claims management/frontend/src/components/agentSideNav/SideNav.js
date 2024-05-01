import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./SideNav.css";

const agentSideNav = () => {
  return (
    <div className="app-side-nav bg-primary">
      <nav className="side-nav-content">
        <ul className="nav-list1">
          <li className="nav-list-item">
            <i class="fa-solid fa-magnifying-glass"></i>
            <span>
              <Link to="allClaim">All Claims</Link>
            </span>
          </li>
          <li className="nav-list-item">
            <i class="fa-solid fa-list-check"></i>
            <span>
              <Link to="process">Process Claim</Link>
            </span>
          </li>

          <li className="nav-list-item log-out px-4">
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

export default agentSideNav;
