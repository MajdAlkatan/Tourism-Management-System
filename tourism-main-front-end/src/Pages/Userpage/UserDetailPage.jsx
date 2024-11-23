// src/pages/UserDetailPage.js

import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './UserDetailPage.css'; // Updated CSS file
import Spiner from "../../Components/Spiner_loding/Spiner"

function UserDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const profiles = location.state?.profiles || []; // Retrieve profiles data from state

  // Find the user by ID
  const user = profiles.find(profile => profile.user === parseInt(id, 10));

  if (!user) return <p className='spiner'><Spiner/></p>;

  return (
    <div className="user-detail-pages">
      <div className="avatar-containers">
        <img
          src={user.avatar || 'https://via.placeholder.com/150'}
          alt={user.user_name}
          className="avatars"
        />
      </div>
      <div className="user-info">
        <h1>{user.user_name}</h1>
        {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
        {user.birth_date && <p><strong>Birth Date:</strong> {new Date(user.birth_date).toLocaleDateString()}</p>}
        <p><strong>Marital Status:</strong> {user.marital_status ? 'Married' : 'Single'}</p>
        <p><strong>Number of Kids:</strong> {user.num_kids}</p>
      </div>
    </div>
  );
}

export default UserDetailPage;
