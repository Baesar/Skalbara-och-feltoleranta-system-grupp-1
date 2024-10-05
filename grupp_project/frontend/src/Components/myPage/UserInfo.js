import { useAuthContext } from "../../hooks/useAuthContext"

const UserInfo = () => {
    const { user } = useAuthContext()

    const role = () => {
        if (!user) {
            return 'no_user_error'
        }

        return user.role
    }

    return (
        <div>
            <h2>My Page!</h2>
            <label>Name: {user.firstname} {user.lastname}</label>
            <label>Email: {user.email}</label>
            <label>You are assigned as {role()}! Hooray?</label>
        </div>
    )
}

export default UserInfo