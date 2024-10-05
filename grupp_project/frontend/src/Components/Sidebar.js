import React from 'react';
import { NavLink } from 'react-router-dom';
import './WebsiteStyle.css'

// This is where we use an unordered list in the Sidebar to put up all the links
const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
            <NavLink to="/Home" activeclassname="active">
              Home
            </NavLink>
        </li>
        <li>
          <NavLink to="/Admin" activeclassname="active">
           Admin
          </NavLink>  
        </li>
        <li>   
          <NavLink to="/Testing" activeclassname = "active">
            Testing ground here
          </NavLink>
        </li>
        <li>
          <NavLink to="/User" activeclassname="active">
            User
          </NavLink>
        </li>
        <li>
          <NavLink to ="/Staff" activeclassname = "active">
            Staff
          </NavLink>
        </li>
        <li>
          <NavLink to="/SignIn" activeclassname="active">
            SignIn
          </NavLink>      
        </li>
        <li>
          <NavLink to="/SignUp" activeclassname="active">
            SignUp
          </NavLink>     
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;