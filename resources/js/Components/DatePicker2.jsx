import * as React from 'react';
import dayjs, {Dayjs} from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';

export default function DatePicker2({name, datetime, onChanged}) {
    const [value, setValue] = React.useState(
        dayjs(datetime),
    );

    const handleChange = (newValue) => {
        setValue(newValue);
        onChanged(name, newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <DateTimePicker
                    value={value}
                    onChange={handleChange}
                    ampm={false}
                    disablePast={true}
                    inputFormat="YYYY-MM-DD HH:mm:ss"
                    toolbarFormat="YYYY-MM-DD HH:mm:ss"
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}