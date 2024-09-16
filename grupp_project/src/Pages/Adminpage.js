import React from "react";

//import './Components/WebsiteStyle.css';
const Adminpage = () => 
{
    return(
        <div className = "Admin">
            <p>Welcome to admin interface</p>
            <form>
                {/* First is label then the input with specified typer */ }
                { /* To input things into a admin for the to add people we need the following 
                Role : client, staff , patient. 
                then their id, name , email , password to the account , age ect
                finally the tier of access for buildings. should be able to det from no access (cant do anything)
                to level 1 (entry access) 2(room access) , 3 (utlities access ) and finally 4 is medicine/hazard access*/}

                <label></label>
                <select id="role" name="role" required>
                    <option value="patient">Patient</option>
                    <option value="member">Member</option>
                    <option value="staff">Staff</option>
                </select>
                <br></br>
            </form>            
        </div>
    )

}
export default Adminpage;