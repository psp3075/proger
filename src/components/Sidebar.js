import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
import { useAuthContext } from "./../hooks/useAuthContext";
import "./Sidebar.css";
import Avatar from "./Avatar";

function Sidebar() {
  const { user } = useAuthContext();

  return (
    <>
      {user && (
        <div className="sidebar">
          <div className="sidebar-content">
            <div className="user">
              <Avatar src={user.photoURL} />
              <p>Namaste {user.displayName}!</p>
            </div>
            <nav className="links">
              <ul>
                <li>
                  <NavLink exact to="/">
                    <img src={DashboardIcon} alt="icon" />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/create">
                    <img src={AddIcon} alt="add icon" />
                    <span>New Project</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
