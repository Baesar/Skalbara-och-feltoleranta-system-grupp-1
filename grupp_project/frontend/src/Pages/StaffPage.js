import React, { useState } from 'react';
import StaffCalendar from '../Components/StaffCalendar'
import BookingViewForStaff from '../Components/BookingViewForStaff';


function StaffPage() {
    // State for selected date, initially set to null
    const [selectedDate, setSelectedDate] = useState(null);
    // State for selected time, initially set to null
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDateSelect = (date) => {
      setSelectedDate(date); // Set the selected date in state
    };

    // Handler function when a time is selected from the CalendarComponent
    const handleTimeSelect = (time) => {
      setSelectedTime(time); // Set the selected time in state
    };

    // Handler function when booking is removed in the BookingViewForStaff
    const onRemoveBooking = (appointmentData) => {
      
    };

    return ( 
        <div>
      <h1>Booked Sessions</h1>
      
      {/* Calendar component for date and time selection */}
      <StaffCalendar
        onDateSelect={handleDateSelect} // Pass date selection handler
        onTimeSelect={handleTimeSelect} // Pass time selection handler
      />
      
      {/* Display the AppointmentForm only if both date and time are selected */}
      {selectedDate && selectedTime && (
        <div>
          <BookingViewForStaff
            selectedDate={selectedDate} // Pass the selected date
            selectedTime={selectedTime} // Pass the selected time
            onBookAppointment={onRemoveBooking} // Pass appointment booking handler
          />
        </div>
      )}
    </div>
     );
}

export default StaffPage;