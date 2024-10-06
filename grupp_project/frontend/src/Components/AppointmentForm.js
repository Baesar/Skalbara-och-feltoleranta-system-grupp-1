// Import necessary dependencies from React and PropTypes
import React, { useState } from 'react'; 
import { useBookingsContext } from '../hooks/useBookingsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import PropTypes from 'prop-types';  // For type-checking the props
import './AppointmentForm.css';  // Import the corresponding CSS file for styling

// Define the AppointmentForm component
const AppointmentForm = ({ selectedDate, selectedTime, onBookAppointment }) => {
  // Define a state variable 'details' with an empty string as the initial value
  const [details, setDetails] = useState('');

  const { dispatch } = useBookingsContext()
  const { user } = useAuthContext()

  const [error, setError] = useState(null)

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior (e.g., page refresh)

    const startTime = selectedTime.split(' - ')[0]
    const [timeString, meridiem] = startTime.split(' ');
    let [hours, minutes] = timeString.split(':').map(Number);

    if (meridiem === 'PM' && hours !== 12) {
      hours += 12;
    } else if (meridiem === 'AM' && hours === 12) {
      hours = 0;
    }

    const utcDate = new Date(Date.UTC(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes
    ))

    const appointmentData = { date: utcDate, time: selectedTime, details };
    console.log('Appointment Data (UTC):', appointmentData);
    // Invoke the onBookAppointment function passed in as a prop
    // Pass the appointment details, selected date, and selected time as an object

    if (!user) {
      setError('You must be signed in')
      return
    }

    const response = await fetch('/api/bookings/', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      console.log('new booking added', json)
      dispatch({type: 'CREATE_BOOKING', payload: json})
    }

    onBookAppointment(appointmentData);
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


      {/* Submit button for booking the appointment */}
      <button type="submit">Book Appointment</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

// Prop types ensure the correct data types are passed to the component
AppointmentForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,  // Ensure selectedDate is a Date object
  selectedTime: PropTypes.string.isRequired,  // Ensure selectedTime is a string
  onBookAppointment: PropTypes.func.isRequired  // Ensure onBookAppointment is a function
};

// Export the component for use in other parts of the application
export default AppointmentForm;