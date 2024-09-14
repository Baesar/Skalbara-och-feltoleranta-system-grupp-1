import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AppointmentForm.css'; // Import custom styles

const AppointmentForm = ({ selectedDate, selectedTime, onBookAppointment }) => {
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookAppointment({ details, date: selectedDate, time: selectedTime });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      <p>Date: {selectedDate.toDateString()}</p>
      <p>Time: {selectedTime}</p>
      <label>
        Details:
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
      </label>
      <button type="submit">Book Appointment</button>
    </form>
  );
};

// Define prop types for the component
AppointmentForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  selectedTime: PropTypes.string.isRequired,
  onBookAppointment: PropTypes.func.isRequired
};

export default AppointmentForm;

