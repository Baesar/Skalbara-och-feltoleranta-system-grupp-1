import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

const StaffCalendar = ({ onDateSelect, onTimeSelect }) => {
  const [date, setDate] = useState(null); // Start with no date selected
  const [bookingsOnSelectedDate, setBookingsOnSelectedDate] = useState([]);
  const [loading, setLoading] = useState(false);

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
      
      setBookingsOnSelectedDate(bookedSessionsOnSelectedDate)
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
            {bookingsOnSelectedDate.map((booking) => (
              <li key={booking._id} >
                <p>Time: {booking.time}</p>
                <p>Details: {booking.details}</p>
                <p>User_id: {booking.user_id}</p>
              </li>
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