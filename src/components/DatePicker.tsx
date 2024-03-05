import moment from 'moment';
import TextInput from './TextInput';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePickerComponent = ({date, setDate}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TextInput
        label="Due Date"
        returnKeyType="next"
        onPressIn={() => setOpen(true)}
        value={moment(date).format('DD-MM-YYYY')}
      />
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DatePickerComponent;
