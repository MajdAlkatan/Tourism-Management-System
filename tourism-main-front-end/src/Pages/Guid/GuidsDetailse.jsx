import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GuidsDetailse.css'; // Import the CSS file
import Head1 from '../../Components/Head/Head1';
import PieChartWithCenterLabel from '../../Components/Statistics6/Statistics6'; // Import the chart component
import Inputs from '../../Components/input/normalinput/inputs'; // Import input components
import { Bio } from '../../Components/index'; // Import bio component
import Spiner from "../../Components/Spiner_loding/Spiner"
import { baseurl } from '../../App';

function GuidsDetailse() {
  const { id } = useParams(); // Extract the guide ID from the URL
  const [guideDetails, setGuideDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedBio, setEditedBio] = useState('');
  const [editedAvatar, setEditedAvatar] = useState(null); // State for avatar
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Include the Authorization header in the fetch options
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`, // Use the token in the Authorization header
          },
        };

        const response = await fetch(
          `${baseurl}/services/activities/guides/${id}/`,
          options
        );

        if (!response.ok) {
          throw new Error('Failed to fetch guide details');
        }

        const data = await response.json();
        setGuideDetails(data); // Set the guide details directly
        setEditedName(data.name);
        setEditedEmail(data.email);
        setEditedBio(data.bio);
        setEditedAvatar(data.avatar); // Set avatar
      } catch (error) {
        console.error('Error fetching guide details:', error);
        navigate('/error'); // Redirect to an error page or show an error message
      }
    };

    fetchGuideDetails();
  }, [id, navigate]);

  const handleUpdateDetails = async () => {
    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('name', editedName || guideDetails.name);
      formData.append('email', editedEmail || guideDetails.email);
      formData.append('bio', editedBio || guideDetails.bio);

      // Append avatar only if it is not null or undefined
      if (editedAvatar) {
        formData.append('avatar', editedAvatar);
      }

      const options = {
        method: 'PUT',
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: formData,
      };

      const response = await fetch(
        `${baseurl}/services/activities/guides/${id}/`,
        options
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error('Failed to update guide details');
      }

      const updatedData = await response.json();
      setGuideDetails(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating guide details:', error);
    }
  };

  if (!guideDetails) {
    return <div className=' spiner_cntainer_s'><Spiner/></div>; // Show a loading indicator
  }

  return (
    <div className='guidContainer'>
      <Head1
        Title='GuidDetalis'
        subTitle="Here’s what’s going on at your business right now"
        titleButton1='Update Details'
        onClickNavigation={() => setIsEditing(true)}
        image={''}
      />
      <div className='guid-details-container'>
        <div className='guid-details-avatar'>
          <img
            src={guideDetails.avatar || 'default-avatar.png'}
            alt={guideDetails.name}
          />
          {isEditing ? (
            <>
              <Inputs
                placeholder='Full Name'
                type='text'
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <Inputs
                placeholder='Email'
                type='email'
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setEditedAvatar(e.target.files[0])}
              />
            </>
          ) : (
            <>
              <h2 className='guid-details-name'>{guideDetails.name}</h2>
              <p className='guid-details-email'>{guideDetails.email}</p>
            </>
          )}
        </div>
        <div className='guid-details-content'>
          <h2 className='bioguid'>Bio</h2>
          {isEditing ? (
            <Bio
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
            />
          ) : (
            <p className='guid-details-bio'>{guideDetails.bio}</p>
          )}
          <PieChartWithCenterLabel likes={guideDetails.likes} />
        </div>
        {isEditing && (
          <button onClick={handleUpdateDetails}>Save Changes</button>
        )}
      </div>
    </div>
  );
}

export default GuidsDetailse;
