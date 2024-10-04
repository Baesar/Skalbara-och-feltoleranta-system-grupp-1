import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css'; // Import custom styles if needed

const Confirmation = () => {
  const location = useLocation(); // Use to access state passed from navigation
  const navigate = useNavigate();
  
  const appointment = location.state?.appointment;

  // Safeguard if appointment data is not found
  if (!appointment) {
    return (
      <div className="confirmation-container">
        <h2>No appointment found</h2>
        <button onClick={() => navigate('/')}>Back to Calendar</button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <h2>Appointment Confirmed</h2>
      <p>Date: {appointment.date.toDateString()}</p>
      <p>Time: {appointment.time}</p>
      <p>Details: {appointment.details}</p>
      <NavLink to="/User" activeClassName="active">
        Go Back to Calendar
      </NavLink>
    </div>
  );
};

Confirmation.propTypes = {
  appointment: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    time: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired
  })
};

export default Confirmation;