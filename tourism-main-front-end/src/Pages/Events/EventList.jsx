import { useEffect, useState } from 'react';
import axios from 'axios';
import "./EventList.css";
import { Delete } from "../../Components/index";
import { baseurl } from '../../App';

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseurl}/events/`);
        setEvents(response.data.results);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    try {
      await axios.delete(`${baseurl}/events/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter(event => event.id !== id)); // Remove the deleted event from the state
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const getDayName = (dayNumber) => {
    return dayNames[dayNumber] || "Invalid day";
  };

  const padNumber = (number) => {
    return number.toString().padStart(2, '0');
  };

  const formatCrontabDescription = (description) => {
    return description.replace(/\b(\d{1,2}):(\d{1,2})\b/g, (_, hour, minute) => {
      return `${padNumber(hour)}:${padNumber(minute)}`;
    }).replace(/\b(\d)\b/g, (_, dayNumber) => getDayName(dayNumber));
  };

  const categorizedEvents = {
    Daily: events.filter(event => event.type === 'Daily'),
    Weekly: events.filter(event => event.type === 'Weekly'),
    Monthly: events.filter(event => event.type === 'Monthly'),
    Yearly: events.filter(event => event.type === 'Yearly')
  };

  return (
    <div className="event-list">
      {Object.entries(categorizedEvents).map(([category, events]) => (
        <div key={category} className="event-category">
          <h2>{category}</h2>
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-header">
                <h3>{event.name}</h3>
                <Delete onClick={() => handleDelete(event.id)} />
                <span>{event.type}</span>
              </div>
              <p className="event-description">{event.description || "No description available"}</p>
              <p className="event-timestamp">
                <strong>Created:</strong> {new Date(event.created).toLocaleString()} <br />
                <strong>Modified:</strong> {new Date(event.modified).toLocaleString()}
              </p>
              <div className="event-tasks">
                {event.periodic_tasks.map((task, index) => (
                  <div key={index} className="task-item">
                    <strong>{task.periodic_task.name}:</strong> {formatCrontabDescription(task.periodic_task.crontab.description)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventList;
