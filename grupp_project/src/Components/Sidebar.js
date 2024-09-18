import React from 'react';
import { NavLink } from 'react-router-dom';
<<<<<<< HEAD
=======
import './WebsiteStyle.css'
>>>>>>> 8c10174e720d589d8b741890b7f8c19f580b849e
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
            <NavLink to="/Testing" activeClassName = "active">
              Testing ground here
            </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;