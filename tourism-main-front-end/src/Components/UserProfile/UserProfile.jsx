import './UserProfile.css';
import PropTypes from 'prop-types';

function UserProfile({ images, names, ids, navigate }) {
  return (
    <div className="user_block">
      <div className="grid">
        {images.map((imageUrl, index) => (
          <div key={index} className="avatar">
            <img
              src={imageUrl}
              alt={`Profile Picture ${index}`}
              className="imgs"
              onClick={() => navigate(ids[index])} // Ensure this calls the correct navigate function
            />
            <h4>{names[index]}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  ids: PropTypes.arrayOf(PropTypes.number).isRequired, // Add the ids prop
  navigate: PropTypes.func.isRequired,
};

export default UserProfile;
