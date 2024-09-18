import React from "react";
import AdminForm from "../Components/forms/form_admin";
//import './Components/WebsiteStyle.css';
///
const Adminpage = () => 
{
    return(
        <div className = "Admin">
            <p>Welcome to admin interface</p>
            <AdminForm></AdminForm>
        </div>
    )

}
export default Adminpage;