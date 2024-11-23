import './service.css';
import Button from "@mui/material/Button";
import { useState } from 'react';
import PropTypes from 'prop-types'; 
const Service = ({ icon, text }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className='button-container'>

    <Button className='buton'
      onClick={handleClick}
      variant="contained"
      sx={{
        backgroundColor: isClicked? "green" : "primary.main",
        '&:hover': {
          backgroundColor: isClicked? "green" : "primary.light",
        },
      }}
    >
      <span style={{ fontSize: '10px' }}>{text}</span>
      <img src={icon} alt="" />
    </Button>
    </div>
  );
};
Service.propTypes = {
  icon: PropTypes.element.isRequired, 
  text: PropTypes.string.isRequired, 
};
export default Service;
