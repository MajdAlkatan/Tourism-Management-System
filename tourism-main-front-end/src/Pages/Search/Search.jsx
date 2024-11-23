import { useEffect, useState } from 'react';
import '../../Components/Statistics3/Statistics3.css'; // Ensure this file includes styles for `.filter-button` and `.filters`
import './Search.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Search } from './SearchSlice';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar'
function valuetext(value) {
  return `${value}°C`;
}
import Slider from '@mui/material/Slider';const SearchFilters = () => {
 
  const [search, setSearch] = useState("");
  const [tour__duration, setTourDuration] = useState("");
  const [tickets__price, setTicketPrice] = useState("");
  const [tour__takeoff_date, setTourTakeoffDate] = useState("");
  const [tour__takeoff_date__range, setTourTakeoffDateRange] = useState([]);
  
  const [tour__duration__range, setTourDurationRange] = useState(["0","300"]);
  const [tickets__price__range, setTicketPriceRange] = useState(['0','200'])
  const [type, setType] = useState("");
console.log(tickets__price__range)
console.log(tour__duration__range)


const handleCalendarChange = (e) => {
  
  setTourTakeoffDateRange(e.value);
};


  





const handleChange = (event, newValue) => {
  setTourDurationRange(newValue);
};
const handleChange2 = (event, newValue) => {
  setTicketPriceRange(newValue);
};
const dispatch=useDispatch();
const navigate=useNavigate()
const goToTourPage=(id)=>{
  if(type=='tour'){
navigate(`/tour/${id}`)}
else {
  navigate(`/site/${id}`)
}

}
const formatDateForSubmission = (date) => {
  // Create a new Date object
  const d = new Date(date);
  // Format the date in "YYYY-MM-DD" format
  const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  return formattedDate;
};



const Data=useSelector(state=>{return state.search?.searcha.results})
const isLoading = useSelector(state => state.search?.loading); // Assuming your state has an isLoading flag
const handleSubmit = () => {
  // Prepare the payload with explicit checks for empty strings and undefined values
  const payload = {
    search: search || '', // Ensure search is never undefined or empty
    tickets__price__range: tickets__price__range.length ? tickets__price__range : [], // Convert empty array to []
    tour__duration__range: tour__duration__range.length ? tour__duration__range : [], // Convert empty array to []
    tour__takeoff_date__range: tour__takeoff_date__range.map(date => formatDateForSubmission(date)).length ? tour__takeoff_date__range.map(date => formatDateForSubmission(date)) : [], // Convert empty array to []
    tour__takeoff_date: tour__takeoff_date || '', // Ensure date is never undefined or empty
    tickets__price: tickets__price || '', // Ensure price is never undefined or empty
    tour__duration: tour__duration || '', // Ensure duration is never undefined or empty
    type: type || '', // Ensure type is never undefined or empty
  };

  // Dispatch the action with the cleaned-up payload
  dispatch(Search(payload));
};







useEffect(()=>{    
     console.log(Data)
},[Data])
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  return (
    <div>
    <div className="search-filters">
      <div className="search-bar">
        <input type="text" placeholder="Search tours..." onChange={(e) => setSearch(e.target.value)}/>
        <button className="filter-button" onClick={handleSubmit}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      
        <div className="filters">
          <div className="filter-item">
            <label>Type</label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Enter location" />
          </div>
          <div className="filter-item">
            <label>Duration (Exact)</label>
            <input type="number"  onChange={(e) => setTourDuration(e.target.value)} />
          </div>
          <div className="filter-item">
            <label>Duration (Range)</label>
            <Slider
        getAriaLabel={() => 'Temperature range'}
        value={tour__duration__range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={20000}
      />            <span style={{color:"black"}}>{`${tour__duration__range[0]} - ${tour__duration__range[1]}`}</span>

          </div>
          <div className="filter-item">
            <label>Price (Exact)</label>
            <input type="number" value={tickets__price} onChange={(e) => setTicketPrice(e.target.value)} />
          </div>
          <div className="filter-item">
            <label>Price (Range)</label>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={tickets__price__range}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={20000}
      />
               <span style={{color:"black"}}>{`${tickets__price__range[0]} - ${tickets__price__range[1]}`}</span>
            </div>
          <div className="filter-item">
            <label>Date (Exact)</label>
            <input type="date" value={tour__takeoff_date} onChange={(e) => setTourTakeoffDate(e.target.value)} />
          </div>
          <div className="filter-item">
            <label>Date (Range)</label>
            <Calendar selectionMode='range' value={tour__takeoff_date__range} onChange={handleCalendarChange}
            />

          </div>
        </div>
      
    </div>
          <div >  
               {Data?.map((item) => (
          <div className='data' onClick={()=>goToTourPage(item.id)} key={item.id}>{item.name}</div>
        ))}</div>
</div>
  );
};

export default SearchFilters;

