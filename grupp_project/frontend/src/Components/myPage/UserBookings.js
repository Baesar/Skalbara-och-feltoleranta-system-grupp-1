import { useEffect } from 'react'
import { useBookingsContext } from '../../hooks/useBookingsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

const UserBookings = () => {
    const {bookings, dispatch} = useBookingsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await fetch('/api/bookings', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_BOOKINGS', payload: json})
            }
        }

        if (user) {
            fetchBookings()
        }
    }, [dispatch, user])

    return (
        <div className="bookings">
            {bookings && bookings.map((booking) => (
                <p key={booking._id}>{booking.time}</p>
            ))}
        </div>
    )
}

export default UserBookings