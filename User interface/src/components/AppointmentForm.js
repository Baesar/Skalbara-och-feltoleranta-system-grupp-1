<<<<<<< HEAD
// Import necessary dependencies from React and PropTypes
import React, { useState } from 'react'; 
import PropTypes from 'prop-types';  // For type-checking the props
import './AppointmentForm.css';  // Import the corresponding CSS file for styling

// Define the AppointmentForm component
const AppointmentForm = ({ selectedDate, selectedTime, onBookAppointment }) => {
  // Define a state variable 'details' with an empty string as the initial value
  const [details, setDetails] = useState('');

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior (e.g., page refresh)
    
    // Invoke the onBookAppointment function passed in as a prop
    // Pass the appointment details, selected date, and selected time as an object
=======
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AppointmentForm.css'; // Import custom styles

const AppointmentForm = ({ selectedDate, selectedTime, onBookAppointment }) => {
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
>>>>>>> Julius
    onBookAppointment({ details, date: selectedDate, time: selectedTime });
  };

  return (
<<<<<<< HEAD
    // Form for booking an appointment, the onSubmit event is linked to the handleSubmit function
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      {/* Display the selected date in a readable string format */}
      <p>Date: {selectedDate.toDateString()}</p>
      {/* Display the selected time */}
      <p>Time: {selectedTime}</p>

      {/* Input field for entering appointment details */}
      <label>
        Details:
        <textarea
          value={details}  // Controlled input: the value is linked to the 'details' state
          onChange={(e) => setDetails(e.target.value)}  // Update the 'details' state when the input changes
          required  // Make the textarea required
        />
      </label>

      {/* Submit button for booking the appointment */}
=======
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
>>>>>>> Julius
      <button type="submit">Book Appointment</button>
    </form>
  );
};

<<<<<<< HEAD
// Prop types ensure the correct data types are passed to the component
AppointmentForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,  // Ensure selectedDate is a Date object
  selectedTime: PropTypes.string.isRequired,  // Ensure selectedTime is a string
  onBookAppointment: PropTypes.func.isRequired  // Ensure onBookAppointment is a function
};

// Export the component for use in other parts of the application
export default AppointmentForm;
=======
// Define prop types for the component
AppointmentForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  selectedTime: PropTypes.string.isRequired,
  onBookAppointment: PropTypes.func.isRequired
};

export default AppointmentForm;

>>>>>>> Julius
