import React from "react";
import AdminForm from "../Components/forms/form_admin";
import { NavLink } from "react-router-dom";
//import './Components/WebsiteStyle.css';

// This is the admin page, pretty simple. It only requires the current admin form to function.
const Adminpage = () => 
{
    return(
        <div className = "Admin">
            <p>Welcome to admin interface</p>

            <NavLink to="/AdminList">List of Users</NavLink>


            <form>

            </form>

            <AdminForm></AdminForm>
        </div>
    )
}
export default Adminpage;