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

    return <nav className="nav">
        <div className="nav-left">
            <div className="nav-logo-text">
                <NavLink id='navheader' className="navlink" to="/Home">
                    {GetBetterIcon}
                </NavLink>
                <h3>GetBetter</h3>
            </div>
            <p className="boop-text">(gently boop the cat to get to the home page)</p>
        </div>
        <ul>
            <li>
                <NavLink className="navlink" to="/User">Booking</NavLink>
            </li>
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
                <li>
                    <button onClick={handleClick}>Log out</button>
                </li>
            )}
        </ul>
    </nav>
}

export default Navbar