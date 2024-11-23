import { useState } from "react";
import "./AddEvent.css";
import { Dialog } from "@mui/material";
import Inputs from "../../../Components/input/normalinput/inputs";
import { useDispatch } from "react-redux";
import { addEvent } from "./AddEventSlice"; 
import { useNavigate } from "react-router-dom";
import Footer_Dialog from './../../../Components/Footer_Dialog/Footer_Dialog';

function AddEvent() {
  const [open, setOpen] = useState(true);
  const [eventData, setEventData] = useState({
    name: '',
    type: '',
    start_hour: '',
    start_minute: '',
    end_hour: '',
    end_minute: '',
    start_day_of_week: '',
    end_day_of_week: '',
    start_day_of_month: '',
    end_day_of_month: '',
    start_month_of_year: '',
    end_month_of_year: ''
  });

  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/EventDash'); 
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? Number(value) : value;
    setEventData(prevState => ({ ...prevState, [name]: processedValue }));
  };

  const validate = () => {
    let newErrors = {};

    if (eventData.name.trim() === "") {
      newErrors.name = "Event Name is required.";
    }
    
    // Here, you should check whether an event with the same name already exists.
    // Assuming you have a way to check existing events, e.g., `existingEvents` is an array of event names.
    // const existingEvents = ['Event1', 'Event2']; // Example existing events.
    // if (existingEvents.includes(eventData.name)) {
    //   newErrors.name = "An event with this name already exists.";
    // }

    if (eventData.start_minute < 0 || eventData.start_minute > 59) {
      newErrors.start_minute = "Start minute must be between 0 and 59.";
    }
    
    if (eventData.end_minute < 0 || eventData.end_minute > 59) {
      newErrors.end_minute = "End minute must be between 0 and 59.";
    }

    if (eventData.start_hour < 1 || eventData.start_hour > 24) {
      newErrors.start_hour = "Start hour must be between 1 and 24.";
    }

    if (eventData.end_hour < 1 || eventData.end_hour > 24) {
      newErrors.end_hour = "End hour must be between 1 and 24.";
    }

    if (eventData.type === "Weekly") {
      if (eventData.start_day_of_week < 1 || eventData.start_day_of_week > 7) {
        newErrors.start_day_of_week = "Start day of week must be between 1 and 7.";
      }
      
      if (eventData.end_day_of_week < 1 || eventData.end_day_of_week > 7) {
        newErrors.end_day_of_week = "End day of week must be between 1 and 7.";
      }
    }

    if (eventData.type === "Monthly") {
      if (eventData.start_day_of_month < 1 || eventData.start_day_of_month > 30) {
        newErrors.start_day_of_month = "Start day of month must be between 1 and 30.";
      }
      
      if (eventData.end_day_of_month < 1 || eventData.end_day_of_month > 30) {
        newErrors.end_day_of_month = "End day of month must be between 1 and 30.";
      }
    }

    if (eventData.type === "Yearly") {
      if (eventData.start_month_of_year < 1 || eventData.start_month_of_year > 12) {
        newErrors.start_month_of_year = "Start month of year must be between 1 and 12.";
      }
      
      if (eventData.end_month_of_year < 1 || eventData.end_month_of_year > 12) {
        newErrors.end_month_of_year = "End month of year must be between 1 and 12.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log("handleSubmit called");
      console.log(eventData);
      dispatch(addEvent(eventData));
      handleClose();
    }
  };

  return (
    <Dialog open={open} className="dialog" onClose={handleClose}>
      <div className="add-hotel-container">
        <div className="grid-container">
          <form onSubmit={handleSubmit}>
            <Inputs
              placeholder="Event Name"
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <Inputs
              placeholder="Start Minute"
              type="number"
              name="start_minute"
              value={eventData.start_minute}
              onChange={handleInputChange}
            />
            {errors.start_minute && <p className="error">{errors.start_minute}</p>}

            <Inputs
              placeholder="Start Hour"
              type="number"
              name="start_hour"
              value={eventData.start_hour}
              onChange={handleInputChange}
            />
            {errors.start_hour && <p className="error">{errors.start_hour}</p>}

            <Inputs
              placeholder="End Minute"
              type="number"
              name="end_minute"
              value={eventData.end_minute}
              onChange={handleInputChange}
            />
            {errors.end_minute && <p className="error">{errors.end_minute}</p>}

            <Inputs
              placeholder="End Hour"
              type="number"
              name="end_hour"
              value={eventData.end_hour}
              onChange={handleInputChange}
            />
            {errors.end_hour && <p className="error">{errors.end_hour}</p>}

            <select
              name="type"
              value={eventData.type}
              onChange={handleInputChange}
            >
              <option value="">Select Event Type</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>

            {eventData.type === "Weekly" && (
              <>
                <Inputs
                  placeholder="Start Day of Week"
                  type="number"
                  name="start_day_of_week"
                  value={eventData.start_day_of_week}
                  onChange={handleInputChange}
                />
                {errors.start_day_of_week && <p className="error">{errors.start_day_of_week}</p>}

                <Inputs
                  placeholder="End Day of Week"
                  type="number"
                  name="end_day_of_week"
                  value={eventData.end_day_of_week}
                  onChange={handleInputChange}
                />
                {errors.end_day_of_week && <p className="error">{errors.end_day_of_week}</p>}
              </>
            )}

            {eventData.type === "Monthly" && (
              <>
                <Inputs
                  placeholder="Start Day of Month"
                  type="number"
                  name="start_day_of_month"
                  value={eventData.start_day_of_month}
                  onChange={handleInputChange}
                />
                {errors.start_day_of_month && <p className="error">{errors.start_day_of_month}</p>}

                <Inputs
                  placeholder="End Day of Month"
                  type="number"
                  name="end_day_of_month"
                  value={eventData.end_day_of_month}
                  onChange={handleInputChange}
                />
                {errors.end_day_of_month && <p className="error">{errors.end_day_of_month}</p>}
              </>
            )}

            {eventData.type === "Yearly" && (
              <>
                <Inputs
                  placeholder="Start Month of Year"
                  type="number"
                  name="start_month_of_year"
                  value={eventData.start_month_of_year}
                  onChange={handleInputChange}
                />
                {errors.start_month_of_year && <p className="error">{errors.start_month_of_year}</p>}

                <Inputs
                  placeholder="End Month of Year"
                  type="number"
                  name="end_month_of_year"
                  value={eventData.end_month_of_year}
                  onChange={handleInputChange}
                />
                {errors.end_month_of_year && <p className="error">{errors.end_month_of_year}</p>}
              </>
            )}

            {eventData.type === "Daily" && (
              <p>Daily events do not require additional fields.</p>
            )}

            <div className='footer_dialog'>
              <Footer_Dialog onClick1={handleClose} onClick2={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}

export default AddEvent;
