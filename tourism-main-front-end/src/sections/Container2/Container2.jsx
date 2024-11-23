import PropTypes from 'prop-types';
import './Container2.css'
const Container2 = (props) => {
    return (
      <div className=' main-container2'>{props.children}</div>
    );
  };
  
  Container2.propTypes = {
    children: PropTypes.node.isRequired
  };
  
  export default Container2;