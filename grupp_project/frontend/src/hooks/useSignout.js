import { useAuthContext } from "./useAuthContext"
import { useBookingsContext } from "./useBookingsContext"

export const useSignout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: bookingsDispatch } = useBookingsContext()

    const signout = () => {
        // Remove user from storage
        localStorage.removeItem('user')

        // Dispatch signout action
        dispatch({type: 'SIGNOUT'})
        bookingsDispatch({type: 'SET_BOOKINGS', payload: []})
    }
    
    return {signout}

}