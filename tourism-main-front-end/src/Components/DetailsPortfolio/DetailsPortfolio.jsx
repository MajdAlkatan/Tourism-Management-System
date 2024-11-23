import PropTypes from "prop-types";
import './DetailsPortfolio.css';

function DetailsPortfolio({ images }) {
  return (
      <div className="photo" >
        <img src={images.photo}  /> 
      </div>
    
  );
}

// Adjust PropTypes to expect a single image object
DetailsPortfolio.propTypes = {
  images: PropTypes.shape({
   photo: PropTypes.string.isRequired,
    }).isRequired,
  onClickNav: PropTypes.func.isRequired,
};

export default DetailsPortfolio;
