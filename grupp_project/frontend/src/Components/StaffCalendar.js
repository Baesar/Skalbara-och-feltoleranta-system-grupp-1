import React, { useEffect, useState } from 'react';
import { useBookingsContext } from '../hooks/useBookingsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

const StaffCalendar = ({ onDateSelect, onTimeSelect }) => {
  const [date, setDate] = useState(null); // Start with no date selected
  const [bookingsOnSelectedDate, setBookingsOnSelectedDate] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');

  const { user } = useAuthContext()
  const {bookings, dispatch} = useBookingsContext()

  useEffect(() => {
    const getBookedSessions = async () => {
      const response = await fetch('api/bookings/all', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
  
      const bookedSessionsOnSelectedDate = json.filter(booking => {
        const bookingDate = new Date(booking.date);
        const selectedDateUTC = new Date(Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ));
        const bookingDateUTC = new Date(Date.UTC(
          bookingDate.getFullYear(),
          bookingDate.getMonth(),
          bookingDate.getDate()
        ));
        return bookingDateUTC.getTime() === selectedDateUTC.getTime();
      })
      
      setBookingsOnSelectedDate(bookedSessionsOnSelectedDate)
    }

    if (date) {
      getBookedSessions()
    }
  }, [date])
  
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedTime(''); // Reset the selected time when a new date is chosen

    // Set available times with time ranges (start time - end time)
    setAvailableTimes([
      '10:00 - 11:00 AM',
      '11:00 - 12:00 PM',
      '01:00 - 02:00 PM',
      '03:00 - 04:00 PM'
    ]);
  
    onDateSelect(newDate); // Pass selected date up to parent component
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={date}
        view="month"
      />
      {date ? (bookingsOnSelectedDate.length === 0 ? (
        <div>No booked sessions</div>
          ) : (
            <ul>
              {bookingsOnSelectedDate.map((booking) => (
                <li 
                  key={booking._id}
                >
                  <p>Date: {date.toDateString()}</p>
                  <p>Time: {booking.time}</p>
                  <p>Details: {booking.details}</p>
                  <p>User_id: {booking.user_id}</p>
                </li>
              ))}
            </ul>
          )) : (<div></div>)}
    </div>
  );
};

StaffCalendar.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
};

export default StaffCalendar;