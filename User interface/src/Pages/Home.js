import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import CalendarComponent from '../components/Calendar';
import AppointmentForm from '../components/AppointmentForm';

function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = (appointmentData) => {
    // Navigate to the confirmation page with appointment details
    navigate('/confirmation', { state: { appointment: appointmentData } });
  };

  return (
    <div>
      <h1>Book Your Therapy</h1>
      <CalendarComponent
        onDateSelect={handleDateSelect}
        onTimeSelect={handleTimeSelect}
      />
      {selectedDate && selectedTime && (
        <AppointmentForm
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onBookAppointment={handleBookAppointment}
        />
      )}
    </div>
  );
}

export default Home;
