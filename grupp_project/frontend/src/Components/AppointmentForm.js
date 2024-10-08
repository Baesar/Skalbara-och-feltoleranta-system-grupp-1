import PropTypes from 'prop-types';
import './AppointmentForm.css'; // Import custom styles
import React, { useState } from 'react'; 
import { useBookingsContext } from '../hooks/useBookingsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// Define the AppointmentForm component
const AppointmentForm = ({ selectedDate, selectedTime, onBookAppointment, onCancelAppointment }) => {
  // Define a state variable 'details' with an empty string as the initial value
  const [details, setDetails] = useState('');
  const { dispatch } = useBookingsContext();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior (e.g., page refresh)

    const startTime = selectedTime.split(' - ')[0];
    const [timeString, meridiem] = startTime.split(' ');
    let [hours, minutes] = timeString.split(':').map(Number);

    // Convert AM/PM time to 24-hour format
    if (meridiem === 'PM' && hours !== 12) {
      hours += 12;
    } else if (meridiem === 'AM' && hours === 12) {
      hours = 0;
    }

    // Create a UTC date object based on the selected date and time
    const startTime = selectedTime.split(' - ')[0]
    const [timeString] = startTime.split(' ');
    let [hours, minutes] = timeString.split(':').map(Number);

    const utcDate = new Date(Date.UTC(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes
    ));

    const appointmentData = { date: utcDate, time: selectedTime, details };
    
    console.log('Appointment Data (UTC):', appointmentData);
    // Invoke the onBookAppointment function passed in as a prop
    // Pass the appointment details, selected date, and selected time as an object

    if (!user) {
      setError('You must be signed in');
      return;
    }

    // Send POST request to create a new booking

    const response = await fetch('/api/bookings/', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      dispatch({ type: 'CREATE_BOOKING', payload: json });
      onBookAppointment(appointmentData); // Call parent function to handle booking
    }
  };

  // Handle appointment cancellation
  const handleCancelAppointment = () => {
    setDetails('');  // Clear the details field
    onCancelAppointment();  // Call the cancel function passed from the parent
  };

  return (
    // Form for booking an appointment, the onSubmit event is linked to the handleSubmit function
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      {/* Display the selected date in a readable string format */}
      <p>Date: {selectedDate.toDateString()}</p>
      {/* Display the selected time */}
      <p>Time: {selectedTime}</p>

      {/* Input field for entering appointment details */}
      <label className="details-label">
        Details:
        <textarea
          value={details}  // Controlled input: the value is linked to the 'details' state
          onChange={(e) => setDetails(e.target.value)}  // Update the 'details' state when the input changes
          required  // Make the textarea required
        />
      </label>

      <div className='submit-cancel'>
        {/* Submit button for booking the appointment */}
        <button type="submit">Book Appointment</button>

        {/* Cancel button for canceling the appointment */}
        <button className='cancel' type="button" onClick={handleCancelAppointment}>Cancel</button>
      </div>
      
      {/* Display any error message */}
  <label className="details-label">
    Details:
    <textarea
      value={details}  // Controlled input: the value is linked to the 'details' state
      onChange={(e) => setDetails(e.target.value)}  // Update the 'details' state when the input changes
      required  // Make the textarea required
    />
  </label>

    <div className='submit-cancel'>
      {/* Submit button for booking the appointment */}
      <button type="submit">Book Appointment</button>

      <button className='cancel' type="button" onClick={handleCancelAppointment}>Cancel</button>
    </div>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

// Define prop types for the component
AppointmentForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  selectedTime: PropTypes.string.isRequired,
  onBookAppointment: PropTypes.func.isRequired,
  onCancelAppointment: PropTypes.func.isRequired,
};

export default AppointmentForm;

// Prop types ensure the correct data types are passed to the component
AppointmentForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,  // Ensure selectedDate is a Date object
  selectedTime: PropTypes.string.isRequired,  // Ensure selectedTime is a string
  onBookAppointment: PropTypes.func.isRequired  // Ensure onBookAppointment is a function
};

// Export the component for use in other parts of the application
export default AppointmentForm;
