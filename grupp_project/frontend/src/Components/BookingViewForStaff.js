import Button from '@mui/material/Button';

function BookingViewForStaff({ selectedDate, selectedTime, onRemoveBooking }) {


    return ( 
        <div>
            Booking for {selectedDate.toDateString()} {selectedTime}

            <div>
                <Button variant='contained' color='error'>
                    Remove
                </Button>
            </div>
        </div>
     );
}

export default BookingViewForStaff;