import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function MyDatePicker() {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                value={selectedDate}
                onChange={handleDateChange}
                animateYearScrolling
            />
        </MuiPickersUtilsProvider>
    )
};

export default MyDatePicker;