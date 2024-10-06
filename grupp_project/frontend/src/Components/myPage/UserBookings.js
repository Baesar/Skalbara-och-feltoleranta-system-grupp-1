import './UserBookings.css'; 
import { useEffect } from 'react';
import { useBookingsContext } from '../../hooks/useBookingsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UserBookings = () => {
    const { bookings, dispatch } = useBookingsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await fetch('/api/bookings', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_BOOKINGS', payload: json });
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [dispatch, user]);

    const handleDelete = async (id) => {
        if (!user) return;

        const response = await fetch(`/api/bookings/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            const deletedBooking = await response.json();
            dispatch({ type: 'DELETE_BOOKING', payload: deletedBooking });
        }
    };

    // Helper function to format the date
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bookings">
            <h2>Your Bookings</h2>
            {bookings && bookings.map((booking, index) => (
                <div key={booking._id} className="booking-item">
                    <h4>Session {index + 1}</h4>
                    <p>
                        <strong>Details:</strong> {booking.details}, 
                        <strong>Date:</strong> {formatDate(booking.date)}, 
                        <strong>Time:</strong> {booking.time}
                    </p>
                    {/* Delete Button */}
                    <button onClick={() => handleDelete(booking._id)} className="delete-button">
                        <FontAwesomeIcon icon={faTrash} /> {/* Trash can icon */}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UserBookings;
