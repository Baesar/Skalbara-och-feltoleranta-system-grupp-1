import './UserBookings.css'; 
import { useEffect, useState } from 'react';
import { useBookingsContext } from '../../hooks/useBookingsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const UserBookings = () => {
    const { bookings, dispatch } = useBookingsContext();
    const { user } = useAuthContext();
    
    const [editBookingId, setEditBookingId] = useState(null);
    const [editForm, setEditForm] = useState({ details: '', date: '', time: '' });

    const [availableTimes, setAvailableTimes] = useState([]);

    // Initialize available times when component mounts
    useEffect(() => {
        setAvailableTimes([
            '10:00 - 11:00 AM',
            '11:00 - 12:00 PM',
            '01:00 - 02:00 PM',
            '03:00 - 04:00 PM'
        ]);
    }, []);

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

    const handleEditClick = (booking) => {
        setEditBookingId(booking._id);
        setEditForm({ details: booking.details, date: booking.date, time: booking.time });
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (id) => {
        if (!user) return;
    
        const response = await fetch(`/api/bookings/${id}`, {
            method: 'PATCH',  
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editForm)
        });
    
        if (response.ok) {
            const updatedBooking = await response.json();
            console.log('Updated booking:', updatedBooking);
    
            dispatch({
                type: 'UPDATE_BOOKING',
                payload: updatedBooking
            });
    
            setEditBookingId(null);
        } else {
            const errorText = await response.text();
            console.error('Failed to update booking:', response.status, errorText);
        }
    };
    

    return (
        <div className="bookings">
            <h2>Your Bookings</h2>
            {bookings && bookings.map((booking, index) => (
                <div key={booking._id} className="booking-item">
                    <h4>Session {index + 1}</h4>
                    
                    {/* If this is the booking being edited, show the form */}
                    {editBookingId === booking._id ? (
                        <div className="edit-form">
                            <input 
                                type="text"
                                name="details"
                                value={editForm.details}
                                onChange={handleEditChange}
                                placeholder="Details"
                            />
                            <input 
                                type="date"
                                name="date"
                                value={editForm.date}
                                onChange={handleEditChange}
                            />

                            <select 
                                name="time"
                                value={editForm.time}
                                onChange={handleEditChange}
                            >
                                {availableTimes.map((timeSlot, index) => (
                                    <option key={index} value={timeSlot}>
                                        {timeSlot}
                                    </option>
                                ))}
                            </select>
                            <button onClick={() => handleEditSubmit(booking._id)}>
                                Save
                            </button>
                            <button onClick={() => setEditBookingId(null)}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <>
                            <p>
                                <strong>Details:</strong> {booking.details}, 
                                <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}, 
                                <strong>Time:</strong> {booking.time}
                            </p>
                            <div>
                                <button onClick={() => handleEditClick(booking)} className="edit-button">
                                    <FontAwesomeIcon icon={faEdit} /> {/* Edit icon */}
                                </button>
                                <button onClick={() => handleDelete(booking._id)} className="delete-button">
                                    <FontAwesomeIcon icon={faTrash} /> {/* Trash can icon */}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
    
};

export default UserBookings;

