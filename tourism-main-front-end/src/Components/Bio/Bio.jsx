import "./Bio.css"
import PropTypes from 'prop-types';

const Bio =({onChange,value})  =>{
  return (
    <div>
        <textarea
  name="bio"
  rows="10"
  cols="50"
  placeholder="Write a professional short bio..."
  aria-label="Professional short bio"
  onChange={onChange}
  value={value}
  >
</textarea>

    </div>
  )
}
Bio.propTypes = {
    onChange:PropTypes.func.isRequired,
    value:PropTypes.string
}


export default Bio
