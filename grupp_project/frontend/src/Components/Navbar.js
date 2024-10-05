import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSignout } from '../hooks/useSignout';
import { GetBetterIcon } from './CostumIcons';

const Navbar = () => {
    const { user } = useAuthContext()

    const {signout } = useSignout()

    const handleClick = () => {
        signout()
    }

    const userRole = () => {
        if (!user) {
            return 'member'
        }

        return user.role
    }

    return <nav className="nav">
        <div className="nav-left">
            <div className="nav-logo-text">
                <NavLink id='navheader' className="navlink" to="/Home">
                    {GetBetterIcon}
                </NavLink>
                <h3>GetBetter</h3>
            </div>
            <p className="boop-text">(gently boop the car to get to the home page)</p>
        </div>
        <ul>
            {userRole() === 'member' ? 
                <li>
                    <NavLink className="navlink" to="/User">Make an Appointment</NavLink>
                </li> : 
                (userRole() === 'staff' ? 
                    <li>
                        <NavLink className="navlink" to="/Staff">View Appointments</NavLink>
                    </li> : 
                    (userRole() === 'admin' && 
                        <li>
                            <NavLink className="navlink" to="/Admin">Create Accounts</NavLink>
                        </li>))}
            {user && (
                <li>
                    <NavLink className="navlink" to="/MyPage">My Page</NavLink>
                </li>
            )}
            {!user && (
                <li>
                    <NavLink className="navlink" to="/SignIn">Sign In</NavLink>
                </li>
            )}
            {!user && (
                <li>
                    <NavLink className="navlink" to="/SignUp">Sign Up</NavLink>
                </li>
            )}
            {user && (
                <li className='logout'>
                    <button className="logout" onClick={handleClick}>Log out</button>
                </li>
            )}
        </ul>
    </nav>
}

export default Navbar