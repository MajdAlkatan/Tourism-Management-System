import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Roompage.css';
import Head33 from '../../../../Components/Head/Head33';
import Room from '../../../../assets/roomsvg.svg';
import DeleteButton3 from '../../../../Components/DetleteButton/Deletebutton3/Deletebutton3'; // Adjust the import path if needed
import { useSelector } from 'react-redux'; 
import { baseurl } from '../../../../App';

// const baseurl="${baseurl}"

function RoomPage() {
  const { id } = useParams(); // Get the room ID from the URL
  const [room, setRoom] = useState(null);
  const [hotelId, setHotelId] = useState(null); // State to store the hotel ID
  const navigate = useNavigate(); 
  const params=useParams() // For navigation after deletion
const goToaddTag=()=>{
  navigate(`/add_tag_room/${params.id}`)
}
  const currentLanguage = useSelector((state) => state.language.currentLanguage); // Get current language from Redux state

  useEffect(() => {
    axios.get(`${baseurl}/services/properties/sup-properties/${id}/`, {
      headers: {
        'Accept-Language': currentLanguage, // Include current language in the request
      },
    })
      .then(response => {
        setRoom(response.data);
        setHotelId(response.data.property_id); // Assuming `hotel_id` is returned in the response
      })
      .catch(error => console.error('Error fetching room details:', error));
  }, [id, currentLanguage]); // Add currentLanguage to the dependency array

  const handleDelete = () => {
    axios.delete(`${baseurl}/services/properties/sup-properties/${id}/`, {
      headers: {
        'Accept-Language': currentLanguage, // Include current language in the request
      },
    })
      .then(() => {
        alert('Room deleted successfully');
        if (hotelId) {
          navigate(`/hotel-page/${hotelId}`); // Redirect to the specific hotel page
        } else {
          navigate('/'); // Fallback navigation if hotel ID is not available
        }
      })
      .catch(error => {
        console.error('Error deleting room:', error);
        alert('Failed to delete room'); // Optional: Provide user feedback
      });
  };

  const handleAddBed = () => {
    navigate(`/add-bed/${id}`); // Navigate to the Add Bed page with room ID
  };

  const handleUpdateRoom = () => {
    navigate(`/update-room/${id}`); // Navigate to the Update Room page
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="room-page">
      <Head33
        Title={room.name}
        subTitle={room.description}
        titleButton1="Add Bed"
        titleButton2="Add Tag "
        onClickNavigation2={goToaddTag}
        titleButton3="Update Room"
        onClickNavigation={handleAddBed}  // Navigate to Add Bed page
        onClickNavigation3={handleUpdateRoom}  // Navigate to Update Room page
        image={Room}  // Optionally provide a default image or leave blank
      />

      <div className="room-details">
        <div className="image-grid">
          {room.photos && room.photos.length > 0 ? (
            room.photos.map(photo => (
              <div key={photo.id} className="grid-item">
                <img src={photo.image} alt={`Room Image ${photo.id}`} />
              </div>
            ))
          ) : (
            <p>No photos available</p>
          )}
        </div>

        <div className="details-section">
          <h3>Room Details</h3>
          <p><strong>Type:</strong> {room.type}</p>
          <p><strong>Price:</strong> ${room.price}</p>
          <p><strong>Number Available:</strong> {room.number}</p>
          <p><strong>Adults Capacity:</strong> {room.adults_capacity}</p>
          <p><strong>Children Capacity:</strong> {room.children_capacity}</p>
          <p><strong>Multi-Night Discount:</strong> {room.multi_night_discount}%</p>
          <p><strong>Points Discount:</strong> {room.points_discount}%</p>

          <h4>Beds Information</h4>
          {room.beds && room.beds.length > 0 ? (
            <ul>
              {room.beds.map(bed => (
                <li key={bed.id}>
                  <strong>{bed.type}</strong> - Capacity: {bed.capacity} - Number: {bed.number}
                </li>
              ))}
            </ul>
          ) : (
            <p>No beds information available</p>
          )}

          <DeleteButton3 onClick={handleDelete} /> {/* Add the delete button here */}
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
