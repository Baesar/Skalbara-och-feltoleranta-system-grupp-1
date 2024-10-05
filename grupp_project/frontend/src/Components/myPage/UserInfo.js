import { useAuthContext } from "../../hooks/useAuthContext"

const UserInfo = () => {
    const { user } = useAuthContext()

    return (
        <div>
            <h2>My Page!</h2>
            <label>Name: {user.firstname} {user.lastname}</label>
            <label>Email: {user.email}</label>
        </div>
    )
}

export default UserInfo