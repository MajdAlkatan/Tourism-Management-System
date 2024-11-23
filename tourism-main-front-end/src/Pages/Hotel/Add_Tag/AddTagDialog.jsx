// src/pages/AddTagPage.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchHotels } from '../Hotel_Dashboard/HotelPage';
import { addOrUpdateTag } from './tagsSlice'; // Import the addOrUpdateTag thunk
import './AddTagDialog.css'; // Create a CSS file for styling if needed
import { ServicesPage } from '../../Services/ServicesSlice';
import { baseurl } from '../../../App';

const AddTagPage = () => {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [tagsData, setTagsData] = useState([]); // Ensure this is initialized as an array

  const dispatch = useDispatch();
  const hotelsData = useSelector((state) => state.hotel.data);
  const Data=useSelector(state=>state.services.servicesData?.results)

  useEffect(() => {
    dispatch(ServicesPage());
  
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchHotels()); // Fetch hotels data
  }, [dispatch]);
  const Dataa=Data?.filter(tag => tag.type === "Activity")

  useEffect(() => {
    // Fetch all tags data when the component mounts
    const fetchTagsData = async () => {
      try {
        const response = await axios.get(`${baseurl}/services/properties/property-tags/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        });
        if (response.data && Array.isArray(response.data)) {
          setTagsData(response.data); // Set tags data from the response
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tags data:', error);
      }
    };

    fetchTagsData();
  }, []);

  const handleSaveTag = () => {
    if (!selectedProperty || !selectedTag) {
      console.error('Property or Tag not selected');
      return;
    }

    const tagData = {
      propertyId: selectedProperty,
      tagId: selectedTag,
    };

    dispatch(addOrUpdateTag(tagData))
      .unwrap() // To handle success or failure
      .then(() => {
        console.log('Tag saved successfully');
        // Optionally, reset the form or display a success message
      })
      .catch((error) => {
        console.error('Failed to save tag:', error);
        // Optionally, display an error message
      });
  };

  return (
    <div className="add-tag-page">
      <h2>Add Tag</h2>
      <div className="form-group">
        <label htmlFor="property">Select Property:</label>
        <select
          id="property"
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
        >
          <option value="">-- Select Property --</option>
          {hotelsData.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tag">Select Tag:</label>
        <select
          id="tag"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">-- Select Tag --</option>
          {Dataa.length > 0 && tagsData.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name} {/* Display the tag name */}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <button onClick={handleSaveTag}>Save</button>
      </div>
    </div>
  );
};

export default AddTagPage;
