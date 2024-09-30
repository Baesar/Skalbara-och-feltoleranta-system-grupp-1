import React from "react";


//import './Components/WebsiteStyle.css';
import AdminForm from "../Components/forms/form_admin";

//import './Components/WebsiteStyle.css';
/// this is the admin page. pretty simple. it only requires the current admin form to function .
const Adminpage = () => 
{
    return(
        <div className = "Admin">
            <p>Welcome to admin interface</p>
            <form>
                
            </form>            


            <AdminForm></AdminForm>
        </div>
    )

}
export default Adminpage;