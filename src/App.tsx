import { useState } from "react";
import "./App.css";
import EventForm from "./components/EventForm";
import { EventEntry } from "./vite-env";

function App() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(() => {
    return today.toISOString().split("T")[0]; 
  });

  const [events, setEvents] = useState(() => {
    const localStorageEvents = localStorage.getItem("calendarEvents");
    return localStorageEvents ? JSON.parse(localStorageEvents) : [];
  })

  function handleDateChange(e) {
    const newDate = e.target.value; 
    setSelectedDate(newDate);
  }

  function handleEventAdded(newEvent: EventEntry) {
    const updatedEvents = [...events, newEvent]

    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setEvents(updatedEvents)
  }

  const upcomingEvents = events
    .filter((event: EventEntry) => new Date(event.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <h1>calendar thingie</h1>
      <div>
        <label htmlFor="selectedDate">select a date: </label>
        <input
          type="date"
          id="selectedDate"
          name="trip-start"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <br />
      <EventForm date={selectedDate} onEventAdded={handleEventAdded} />
      {/* ==== events display ==== */}
      <div>
        {/* TODO add edit and delete buttons */}
        <h3>Upcoming Events</h3>
        {upcomingEvents.length > 0 ? (
          <ul>
              {upcomingEvents.map((event: EventEntry) => (
                <li key={event.id} className={event.date === selectedDate ? "current-date-event" : ""}>
                  <div className="event-date">{event.date}</div>
                  <strong>{event.title}</strong>
                  {event.startTime && <span className="event-time"> at {event.startTime}</span>}
                  {event.endTime && <p className="event-desc"> till {event.endTime}</p>}
                </li>
              ))}
          </ul>
        ) : (
          <p>no upcoming events</p>
        )}
      </div>
    </>
  );
}

export default App;