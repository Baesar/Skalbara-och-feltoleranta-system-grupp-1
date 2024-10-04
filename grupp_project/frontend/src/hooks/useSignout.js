import { useAuthContext } from "./useAuthContext"

export const useSignout = () => {
    const { dispatch } = useAuthContext()

    const signout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch signout action
        dispatch({type: 'SIGNOUT'})
    }
    
    return {signout}

}