import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './Calendar.css'; 

const CalendarComponent = ({ onDateSelect, onTimeSelect }) => {
  const [date, setDate] = useState(null); // Start with no date selected
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  // Define available time slots
  const potentialTimes = [
    '10:00 - 11:00 AM',
    '11:00 - 12:00 PM',
    '13:00 - 14:00 PM',
    '15:00 - 16:00 PM',
  ];

  useEffect(() => {
    if (date) {
      const fetchAvailableTimes = async () => {
        setLoading(true);
        const bookedSessions = await getBookedSessions();
        filterAvailableTimes(bookedSessions);
        setLoading(false);
      };
      fetchAvailableTimes();
    }
  }, [date]);

  const getBookedSessions = async () => {
    const response = await fetch('api/bookings/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    // Filter sessions booked for the selected date
    const bookedSessionsOnSelectedDate = json.filter((booking) => {
      const bookingDate = new Date(booking.date);
      const selectedDateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const bookingDateUTC = new Date(Date.UTC(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate()));

      return bookingDateUTC.getTime() === selectedDateUTC.getTime();
    });

    return bookedSessionsOnSelectedDate;
  };

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' '); 
    let [hours, minutes] = time.split(':').map(Number); // Extract hours and minutes

    if (modifier === 'PM' && hours !== 12) {
      hours += 12; 
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0; 
    }

    return { hours, minutes };
  };

  // Filter available times by excluding booked sessions and times that have passed (if today)
  const filterAvailableTimes = (bookedSessions) => {
    const now = new Date(); // Current time

    const newAvailableTimes = potentialTimes.filter((time) => {
      const [startTime] = time.split(' - '); 
      const { hours: sessionHour, minutes: sessionMinutes } = parseTime(startTime); 

      const isBooked = bookedSessions.some((booking) => booking.time === time);

      const isToday = date.toDateString() === now.toDateString();
      const isPast = isToday && (sessionHour < now.getHours() || (sessionHour === now.getHours() && sessionMinutes <= now.getMinutes()));

      return !isBooked && !isPast; // Only show available times that are not booked or in the past
    });

    setAvailableTimes(newAvailableTimes);
  };

  const handleDateChange = (newDate) => {
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
        minDate={new Date()} // Prevent selecting past dates
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
                  selectedTime === time ? 'selected' : ''
                } ${availableTimes.includes(time) ? 'available' : 'unavailable'}`}
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
