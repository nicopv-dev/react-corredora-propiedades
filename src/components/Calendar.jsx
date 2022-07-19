import ReactCalendar from "react-calendar";

export default function Calendar({ selectedDate, onChangeSelectedDate }) {
  return (
    <ReactCalendar onChange={onChangeSelectedDate} value={selectedDate?.date} />
  );
}
