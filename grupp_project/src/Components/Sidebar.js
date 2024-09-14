import React from 'react';
import { NavLink } from 'react-router-dom';
//import './Sidebar.css'; // Optional for styling
// here is were we using a unlisted list in the sideBar put up all the links
const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/Home" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/Admin" activeClassName="active">
            Admin
          </NavLink>      
        </li>
        <li>
          <NavLink to="/SignIn" activeClassName="active">
            SignIn
          </NavLink>      
        </li>
        <li>
          <NavLink to="/SignUp" activeClassName="active">
            SignUp
          </NavLink>      
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;