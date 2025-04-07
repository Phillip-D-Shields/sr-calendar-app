import { useState } from "react";
import "./App.css";

const parseDate = (input) => new Date(input).toISOString().split("T")[0]

function App() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const todayRaw = new Date();
    const todayParsed = parseDate(todayRaw);
    return todayParsed;
  });

  function handleDateChange(e) {
    const newDateRaw = e.target.value;
    const newDateParsed = parseDate(newDateRaw);
    setSelectedDate(newDateParsed);
  }

  return (
    <>
      <h3>
        <small>selected date: {selectedDate}</small>
      </h3>
      <h1>calendar app</h1>

      <div>
        <label htmlFor="selectedDate">select a date:</label>
        <input
          type="date"
          id="selectedDate"
          name="trip-start"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
    </>
  );
}

export default App;
