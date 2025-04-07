import { useState } from "react";

interface EventFormProps {
  date: string;
}

function EventForm({ date }: EventFormProps) {
  const twentyFourHours = [
    "0:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];

  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    title: "",
    startTime: "9:00",
    endTime: "17:00",
  });

  function handleStartTimeChange(e) {
    const newStartTime = e.target.value;
    const startIndex = twentyFourHours.indexOf(newStartTime);

    let newEndTime = formData.endTime;
    if (twentyFourHours.indexOf(formData.endTime) <= startIndex) {
      const newEndIndex = Math.min(startIndex + 1, twentyFourHours.length - 1);
      newEndTime = twentyFourHours[newEndIndex];
    }

    setFormData({
      ...formData,
      startTime: newStartTime,
      endTime: newEndTime,
    });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function submitEventEntryToLocalStorage(e) {
    e.preventDefault();
    // TODO logic here
  }

  const validEndTimes = twentyFourHours.filter((time) => {
    return (
      twentyFourHours.indexOf(time) >
      twentyFourHours.indexOf(formData.startTime)
    );
  });

  return (
    <>
      <h2>form goes here</h2>
      <form onSubmit={submitEventEntryToLocalStorage}>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input name="date" type="text" value={date} disabled />

        <select
          name="startTime"
          value={formData.startTime}
          onChange={handleStartTimeChange}
        >
          {twentyFourHours.map((time) => (
            <option key={`start-${time}`} value={time}>
              {time}
            </option>
          ))}
        </select>

        <select
          name="endTime"
          value={formData.endTime}
          onChange={handleInputChange}
        >
          {validEndTimes.map((time) => (
            <option key={`end-${time}`} value={time}>
              {time}
            </option>
          ))}
        </select>

        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default EventForm;
