import './Footer_Dialog.css';
import PropTypes from 'prop-types';

function Footer_Dialog({ onClick1, onClick2 }) {
  return (
    <div className='Button'>
      <button className='close_button' aria-label="close" onClick={onClick1}>
        Close
      </button>
      <button className='close_button' aria-label="close" onClick={onClick2}>
        Save
      </button>
    </div>
  );
}

Footer_Dialog.propTypes = {
  onClick1: PropTypes.func.isRequired,
  onClick2: PropTypes.func.isRequired,
};

export default Footer_Dialog;
