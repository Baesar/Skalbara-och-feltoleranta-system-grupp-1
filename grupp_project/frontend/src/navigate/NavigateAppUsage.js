import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

export const NavigateAppUsage = () => {
    const { user } = useAuthContext()

    if (!user) {
        return <Navigate to="/SignIn"/>
    }

    const role = user.role;

    switch (role) {
        case 'member':
          return <Navigate to="/User"/>
        case 'staff':
          return <Navigate to="/Staff"/>
        case 'admin':
          return <Navigate to="/Admin"/>
        default:
          return <Navigate to="/SignIn"/>
      }
}