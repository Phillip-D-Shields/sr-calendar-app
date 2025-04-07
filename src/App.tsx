import { useState } from "react";
import "./App.css";
import EventForm from "./components/EventForm";

function App() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; 
  });

  function handleDateChange(e) {
    const newDate = e.target.value; 
    setSelectedDate(newDate);
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
      <br />
      <EventForm date={selectedDate} />
    </>
  );
}

export default App;