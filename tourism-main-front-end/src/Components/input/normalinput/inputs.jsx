import './inputs.css';
import PropTypes from 'prop-types';

const Inputs = ({ placeholder, type, name, onChange, value,placeholde }) => {
  return (
    <div className="coolinput">
      <label htmlFor={name} className="textsc">{placeholder}</label>
      <input 
        type={type}  
        id={name} 
        name={name} 
        onChange={onChange} 
        value={value}
        className="input"
        placeholder={placeholde}
      />
    </div>
  );
};

Inputs.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholde: PropTypes.string,

  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Inputs;
