import './UserBookings.css'; 
import { useEffect } from 'react';
import { useBookingsContext } from '../../hooks/useBookingsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UserBookings = () => {
    const { bookings, dispatch } = useBookingsContext();
    const { user } = useAuthContext();

    const userRole = () => {
        if (!user) {
            return 'member'
        }

        return user.role
    }

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
            {(userRole() === 'member') && <h2>Your Bookings</h2>}
            {bookings.length > 0 ? (bookings.map((booking, index) => (
                <div key={booking._id} className="booking-item">
                    <h4>Session {index + 1}</h4>
                    <div className="booking-details">
                        <p> <strong>Details:</strong> {booking.details} </p>
                        <p className='date'> <strong>Date:</strong> {formatDate(booking.date)} </p>
                        <p className='time'> <strong>Time:</strong> {booking.time} </p>
                    </div>
                    {/* Delete Button */}
                    <button onClick={() => handleDelete(booking._id)} className="delete-button">
                        <FontAwesomeIcon icon={faTrash} /> {/* Trash can icon */}
                        Delete
                    </button>
                </div>
            ))
            ) : (
                (userRole() === 'member') && <h3>You have no bookings</h3>)}
        </div>
    );
};

export default UserBookings;
