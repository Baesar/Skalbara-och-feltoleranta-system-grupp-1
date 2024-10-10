import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useBookingsContext } from '../hooks/useBookingsContext'
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const StaffCalendar = ({ onDateSelect, onTimeSelect }) => {
  const [date, setDate] = useState(null); // Start with no date selected
  const [bookingsOnSelectedDate, setBookingsOnSelectedDate] = useState([]);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useBookingsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const getBookedSessions = async () => {
      setLoading(true)
      const response = await fetch('api/bookings/all', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
  
      const bookedSessionsOnSelectedDate = json.filter(booking => {
        const bookingDate = new Date(booking.date);

        const localBookingDate = new Date(bookingDate.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));

        const selectedDateUTC = new Date(Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ));
        const bookingDateUTC = new Date(Date.UTC(
          localBookingDate.getFullYear(),
          localBookingDate.getMonth(),
          localBookingDate.getDate()
        ));
        return bookingDateUTC.getTime() === selectedDateUTC.getTime();
      })

      const bookingsWithUserDetails = await Promise.all(bookedSessionsOnSelectedDate.map(async (booking) => {
        const userResponse = await fetch(`/api/user/${booking.user_id}`, {
          headers: { 'Authorization': `Bearer ${user.token}`}
        })
        const userDetails = await userResponse.json()
        return { ...booking, userDetails }
      }))
      
      setBookingsOnSelectedDate(bookingsWithUserDetails)
      setLoading(false)
    }

    if (date) {
      getBookedSessions()
    }
  }, [date, user.token])
  
  const handleDateChange = (newDate) => {
    setDate(newDate);
  
    onDateSelect(newDate); // Pass selected date up to parent component
  };

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

        setBookingsOnSelectedDate(prevBookings => 
          prevBookings.filter(booking => booking._id !== id)
        );
    }
  };

  return (
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={date}
          view="month"
        />
        {date ? <h3>Bookings for {date.toDateString()}:</h3> : <h4>No date selected</h4>}
        {loading ? (
          <div>Loading bookings...</div>
        ) : date ? (
          bookingsOnSelectedDate.length === 0 ? (
            <div>No booked sessions</div>
          ) : (
            <ul>
              {bookingsOnSelectedDate.map((booking, index) => (
                <div key={booking._id} className="booking-item">
                <h4>Session {index + 1}</h4>
                <div className="booking-details">
                    <p> <strong>Details:</strong> {booking.details} </p>
                    <p className='time'> <strong>Time:</strong> {booking.time} </p>
                    <p className='user-id'> <strong>Name:</strong> {booking.userDetails.firstname} {booking.userDetails.lastname} </p>
                    <p className='user-id'> <strong>Email:</strong> {booking.userDetails.email} </p>

                </div>
                {/* Delete Button */}
                <button onClick={() => handleDelete(booking._id)} className="delete-button">
                    <FontAwesomeIcon icon={faTrash} /> {/* Trash can icon */}
                    Delete
                </button>
              </div>
              ))}
            </ul>
          )) : (
          <div></div>
          )}
      </div>
  );
};

StaffCalendar.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
};

export default StaffCalendar;