import React, {useState} from 'react';
import moment from 'moment';
import TextInput from './TextInput';
import DatePicker from 'react-native-date-picker';

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({date, setDate}) => {
  const [open, setOpen] = useState(false);

  // Function to handle date selection
  const handleDateChange = (selectedDate: Date) => {
    setOpen(false);
    setDate(selectedDate);
  };

  return (
    <>
      {/* Text input to display selected date */}
      <TextInput
        label="Due Date"
        returnKeyType="next"
        onPressIn={() => setOpen(true)}
        value={moment(date).format('DD-MM-YYYY')}
      />
      {/* Date picker modal */}
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={handleDateChange}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default DatePickerComponent;
