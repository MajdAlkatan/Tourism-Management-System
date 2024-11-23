import { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';
import Footer_Dialog from './../../../Components/Footer_Dialog/Footer_Dialog';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDiscount } from './MakediscountSlice';
import TabBar from '../../../Components/TabBar/Tab_Bar';
import axios from 'axios';
import './Makediscount.css'; // Import your custom CSS file
import { baseurl } from '../../../App';

function Makediscount() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({ service: '', event: '', percent: '' });
  const [selectedTab, setSelectedTab] = useState('service');
  const [sites, setSites] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [events, setEvents] = useState({});
  const [tours, setTours] = useState([]);
  const [apiError, setApiError] = useState(null);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.discount);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(`${baseurl}/services/activities/listings/`);
        if (response.status === 200) {
          if (response.data && Array.isArray(response.data.results)) {
            setSites(response.data.results);
          } else {
            console.error('Sites API did not return an array:', response.data);
            setSites([]);
          }
        } else {
          handleError(response.status);
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
        handleError(error.response?.status);
      }
    };

    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${baseurl}/services/properties/`);
        if (response.status === 200) {
          if (response.data && Array.isArray(response.data.results)) {
            setHotels(response.data.results);
          } else {
            console.error('Hotels API did not return an array:', response.data);
            setHotels([]);
          }
        } else {
          handleError(response.status);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
        handleError(error.response?.status);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseurl}/events/`);
        if (response.status === 200) {
          if (response.data && Array.isArray(response.data.results)) {
            const categorizedEvents = categorizeEvents(response.data.results);
            setEvents(categorizedEvents);
          } else {
            console.error('Events API did not return an array:', response.data);
            setEvents({});
          }
        } else {
          handleError(response.status);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        handleError(error.response?.status);
      }
    };

    const fetchTours = async () => {
      try {
        const response = await axios.get(`${baseurl}/services/activities/tours`);
        if (response.status === 200) {
          if (response.data && Array.isArray(response.data.results)) {
            setTours(response.data.results);
          } else {
            console.error('Tours API did not return an array:', response.data);
            setTours([]);
          }
        } else {
          handleError(response.status);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
        handleError(error.response?.status);
      }
    };

    fetchSites();
    fetchHotels();
    fetchEvents();
    fetchTours();
  }, []);

  const categorizeEvents = (events) => {
    const categories = {
      Daily: [],
      Weekly: [],
      Monthly: [],
      Yearly: []
    };

    events.forEach((event) => {
      if (event.type) {
        categories[event.type].push(event);
      } else {
        categories['Daily'].push(event);
      }
    });

    return categories;
  };

  const handleError = (statusCode) => {
    switch (statusCode) {
      case 400:
        setApiError('Bad Request: Please check your input.');
        break;
      case 401:
        setApiError('Unauthorized: Please log in.');
        break;
      case 403:
        setApiError('Forbidden: You do not have permission to access this resource.');
        break;
      case 404:
        setApiError('Not Found: The requested resource could not be found.');
        break;
      case 500:
        setApiError('Server Error: Something went wrong on our end.');
        break;
      default:
        setApiError('An unexpected error occurred.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/Discountpage");
  };

  const handleSubmit = async () => {
    const { service, event, percent } = formData;
    try {
      await dispatch(createDiscount({ service, event, percent }));
    } catch (error) {
      handleError(error.response?.status);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
    setFormData({ service: '', event: '', percent: '' });
  };

  return (
    <div>
      <Dialog open={open} className="dialog">
        <div className="add-hotel-container">
          <TabBar
            className="tab-bar"
            selectedTab={selectedTab}
            onTabSelect={handleTabSelect}
          />
          <div className="grid-containerq">
            {(selectedTab === 'service' || selectedTab === 'both') && (
              <select
                name="service"
                onChange={handleChange}
                value={formData.service}
                className="dropdown-service"
              >
                <option value="">Select Service</option>
                {sites.length > 0 && (
                  <optgroup label="Sites">
                    {sites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                {hotels.length > 0 && (
                  <optgroup label="Hotels">
                    {hotels.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                {tours.length > 0 && (
                  <optgroup label="Tours">
                    {tours.map((tour) => (
                      <option key={tour.id} value={tour.id}>
                        {tour.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            )}
            {(selectedTab === 'event' || selectedTab === 'both') && (
              <select
                name="event"
                onChange={handleChange}
                value={formData.event}
                className="dropdown-event"
              >
                <option value="">Select Event</option>
                {Object.keys(events).map((category) => (
                  events[category].length > 0 && (
                    <optgroup key={category} label={category}>
                      {events[category].map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.name}
                        </option>
                      ))}
                    </optgroup>
                  )
                ))}
              </select>
            )}
            <input
              type="number"
              name="percent"
              placeholder="Discount Percent"
              onChange={handleChange}
              value={formData.percent}
              className="input-percent"
            />
          </div>

          <Footer_Dialog
            onClick1={handleClose}
            onClick2={handleSubmit}
            className="footer-dialog"
          />
          {loading && <p className="loading">Loading...</p>}
          {apiError && <p className="error">Error: {apiError}</p>}
          {error && !apiError && <p className="error">Error: {error}</p>}
        </div>
      </Dialog>
    </div>
  );
}

export default Makediscount;
