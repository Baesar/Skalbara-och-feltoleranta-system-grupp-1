import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default Calendar CSS
import './Calendar.css'; // Import custom styles

const CalendarComponent = ({ onDateSelect, onTimeSelect }) => {
  const [date, setDate] = useState(null); // Start with no date selected
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  
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
          <h3>Available Times for {date.toDateString()}:</h3>
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

CalendarComponent.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
};

export default CalendarComponent;