import { useEffect, useState } from 'react';
import './PriceInput.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { CurrencyPage } from '../../../Pages/Ticket/TicketSlice';
import { useDispatch } from 'react-redux';
const PriceInput = ({ onChange, onCurrencySelect, placeholder ,name}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('$');
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(CurrencyPage());
  }, [dispatch])
  const currencies = useSelector(state => state.ticket.currency?.results);
  console.log(currencies)
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const selectCurrency = (currenc) => {
    setSelectedCurrency(currenc);
    setDropdownVisible(false);
    onCurrencySelect(currenc);
  };

  return (
    <div className="inputGroup">
      <label htmlFor={name} className="textsc">{placeholder}</label>
      <input type="text" onChange={onChange} placeholder={placeholder} name={name} />
      <span className="price-icon">{selectedCurrency}</span>
      <span className="price-arrow" onClick={toggleDropdown}>&#9660;</span>
      {isDropdownVisible && currencies && (
        <ul className="dropdown-list">
          {currencies?.map((currenc) => (
            <li key={currenc.id} onClick={() => selectCurrency(currenc.currency)}>
              {currenc.currency}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

PriceInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onCurrencySelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

};

export default PriceInput;
