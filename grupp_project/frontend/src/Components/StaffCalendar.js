import React, { useState } from 'react';
import { useBookingsContext } from '../hooks/useBookingsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

const StaffCalendar = ({ onDateSelect, onTimeSelect }) => {
  const [date, setDate] = useState(null); // Start with no date selected
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');

  const { user } = useAuthContext()
  
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedTime(''); // Reset the selected time when a new date is chosen

    const potentialTimes = [
      '10:00 - 11:00 AM',
      '11:00 - 12:00 PM',
      '01:00 - 02:00 PM',
      '03:00 - 04:00 PM'
    ]

    const getAvailableTimes = async () => {
      const response = await fetch('api/bookings/all', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      //json.find()
    }
    
    // Set available times with time ranges (start time - end time)
    setAvailableTimes([
      '10:00 - 11:00 AM',
      '11:00 - 12:00 PM',
      '01:00 - 02:00 PM',
      '03:00 - 04:00 PM'
    ]);
  
    onDateSelect(newDate); // Pass selected date up to parent component
  };

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
      />
      {date && availableTimes.length > 0 && (
        <div className="appointments-list">
          <h3> Times for {date.toDateString()}:</h3>
          <ul>
            {availableTimes.map((time, index) => (
              <li
                key={index}
                className={selectedTime === time ? 'selected' : ''}
                onClick={() => handleTimeClick(time)} // Handle time selection
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

StaffCalendar.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
};

export default StaffCalendar;