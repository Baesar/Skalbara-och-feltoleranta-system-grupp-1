import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import CalendarComponent from '../Components/Calendar';
import AppointmentForm from '../Components/AppointmentForm';

function StaffPage() {

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
        <div>

        </div>
      )}
    </div>
     );
}

export default StaffPage;