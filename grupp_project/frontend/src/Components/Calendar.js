import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default Calendar CSS
import './Calendar.css'; // Import custom styles

const CalendarComponent = ({ onDateSelect, onTimeSelect }) => {
  const [date, setDate] = useState(null); // Start with no date selected
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext()

  const potentialTimes = [
    '10:00 - 11:00 AM',
    '11:00 - 12:00 PM',
    '01:00 - 02:00 PM',
    '03:00 - 04:00 PM'
  ]

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      setLoading(true)
      const bookedSessions = await getBookedSessions()
      getAvailableTimes(bookedSessions)
      setLoading(false)
    }

    if (date) {
      fetchAvailableTimes()
    }
  }, [date])

  const getBookedSessions = async () => {
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
    
    return bookedSessionsOnSelectedDate
  }

  const getAvailableTimes = (bookedSessions) => {
    const newAvailableTimes = potentialTimes.filter((time) => {
      return !bookedSessions.some((booking) => booking.time === time)
    })

    setAvailableTimes(newAvailableTimes)
  }
  
  const handleDateChange = async (newDate) => {
    setDate(newDate);
    handleTimeClick(null); // Reset the selected time when a new date is chosen
    onDateSelect(newDate); // Pass selected date up to parent component
  };

  // Handle time selection
  const handleTimeClick = (time) => {
    setSelectedTime(time);
    onTimeSelect(time); // Pass selected time up to parent component
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={date}
        view="month"
        minDate={new Date()} // Prevents selecting past dates
      />
      {loading && <p>Loading available times...</p>}
      {date && availableTimes.length > 0 && !loading && (
        <div className="appointments-list">
          <h3>Available Times for {date.toDateString()}:</h3>
          <ul>
            {potentialTimes.map((time, index) => (
              <li
                key={index}
                className={`${
                  selectedTime === time ? 'selected' : ''} ${
                  availableTimes.includes(time) ? 'available' : 'unavailable' 
                }`}
                onClick={() => availableTimes.includes(time) && handleTimeClick(time)} // Handle time selection
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}
      {date && availableTimes.length === 0 && (
        <h3>No available times for {date.toDateString()}</h3>
      )}
    </div>
  );
};

CalendarComponent.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
};

export default CalendarComponent;
