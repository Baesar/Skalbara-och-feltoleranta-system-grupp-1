import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import CalendarComponent from '../Components/Calendar';
import AppointmentForm from '../Components/AppointmentForm';
import '../Components/WebsiteStyle.css'; 


function Userpage() {
  // State for selected date, initially set to null
  const [selectedDate, setSelectedDate] = useState(null);
  // State for selected time, initially set to null
  const [selectedTime, setSelectedTime] = useState(null);
  // Initialize the useNavigate hook to allow navigation
  const navigate = useNavigate(); 

  // Handler function when a date is selected from the CalendarComponent
  const handleDateSelect = (date) => {
    setSelectedDate(date); // Set the selected date in state
  };

  // Handler function when a time is selected from the CalendarComponent
  const handleTimeSelect = (time) => {
    setSelectedTime(time); // Set the selected time in state
  };

  // Handler function when the appointment is booked in the AppointmentForm
  const handleBookAppointment = (appointmentData) => {
    // Navigate to the confirmation page and pass the appointment details via state
    navigate('/confirmation', { state: { appointment: appointmentData } });
  };

  // Handler function when the appointment is canceled in the AppointmentForm
  const handleCancelAppointment = () => {
    handleTimeSelect(null)
  }

  return (
    <div>
      <h1>Book Your Therapy</h1>
      
      {/* Calendar component for date and time selection */}
      <CalendarComponent
        onDateSelect={handleDateSelect} // Pass date selection handler
        onTimeSelect={handleTimeSelect} // Pass time selection handler
      />
      
      {/* Display the AppointmentForm only if both date and time are selected */}
      {selectedDate && selectedTime && (
        <AppointmentForm
          selectedDate={selectedDate} // Pass the selected date
          selectedTime={selectedTime} // Pass the selected time
          onBookAppointment={handleBookAppointment} // Pass appointment booking handler
          onCancelAppointment={handleCancelAppointment} // Padd appointment cancel handler
        />
      )}
    </div>
  );
}

// Export the Home component as the default export
export default Userpage;
