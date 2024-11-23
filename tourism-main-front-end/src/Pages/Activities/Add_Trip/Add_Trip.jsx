import "./Add_Trip.css";
import { Dialog } from "@mui/material";
import Inputs from "../../../Components/input/normalinput/inputs";
import ImageInput from "../../../Components/input/imageinput/imageinput";
import { useState } from "react";
import Footer_Dialog from "./../../../Components/Footer_Dialog/Footer_Dialog";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTour } from "./Add_TripSlice";
import { Calendar } from 'primereact/calendar'
import i from '../../../assets/Green-check-mark-icon.png'
import { setTour } from "./Add_TripSlice";
import { baseurl } from '../../../App';

function Add_Trip() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [refund_rate, setRefundRate] = useState("");
  const [description, setDescription] = useState("");
  const [takeoff_date, setTakeoffDate] = useState("");
  const dispatch = useDispatch();
  const [optionsData, setOptionsData] = useState([]);
  const [guid_id, setGuid_Id] = useState("");
  const [allow_points, setAllowPoints] = useState("");
  const [photos, setPhotos] = useState("");
  const [points_gift, setPointGift] = useState("");
  const [istrue,setTrue] = useState(false);


  
  const [open, setOpen] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseurl}/services/activities/guides/`)
      .then((response) => response.json())
      .then((data) => setOptionsData(data.results));
  }, []);
  const goToServicesPage=()=>{
    navigate('/activities')
}
  const handleClose = () => {
    setOpen(false);
    navigate("/activities");
  };
const Data=useSelector(state=>state.tours?.success)
  const handleOptionChange = (event) => {
    
    const idAndName = event.target.value.split(' '); 
    const guidId = idAndName[0]; 
    setGuid_Id(guidId);
    console.log(guidId); 
  };
  useEffect(() => {
    if (Data) {
      setTrue(true);
      dispatch(setTour());
    }
  }, [Data,dispatch]);
  const handleName = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");

    console.log(
      name,
      photos,
      duration,
      refund_rate,
      description,
      takeoff_date,
      allow_points,
      guid_id
    );
    dispatch(
      addTour({
      
        name,
        photos,
        duration,
        refund_rate,
        description,
        takeoff_date,
        allow_points,
        guid_id,
        points_gift
        
      })
    );
  };

  const onFilesSelected = (event) => {
    setPhotos(Array.from(event.target.files));
  };
  
  

  const handleDateChange = (e) => {
    const date = new Date(e.value);
    const formattedDate = `${date.toISOString().split('T')[0]}T00:00`;
    setTakeoffDate(formattedDate);
  };
  
  

  const handleCheckboxChange = (event) => {
    setAllowPoints(event.target.checked);

    console.log(event.target.checked);
  };

  return (
    <Dialog open={open} scroll="paper">
      {!istrue?(
      <div className="trip_container">
        <div className="name_and_image">
          <Inputs
            placeholder="Enter site name"
            type="text"
            onChange={handleName}
          />
          <ImageInput onFilesSelected={onFilesSelected} />


        </div>
        <div className="inputss">
        <div className='calendar-container'>
       <label className='calendar-border-label'>Date</label>
       <Calendar  onChange={handleDateChange}  dateFormat="dd-mm-yy" baseZIndex={2000} selectionMode="range"/>
               
       </div> <Inputs
            placeholder="number of days"
            type="number"
            onChange={(e) => setDuration(e.target.value)}
          />
          <Inputs
            placeholder="refund rate"
            type="number"
            onChange={(e) => setRefundRate(e.target.value)}
          />
              <Inputs
            placeholder="point gift"
            type="number"
            onChange={(e) => setPointGift(e.target.value)}
          />
          <Inputs
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="coolinput">
            <label htmlFor="input" className="text">
              Choose Guide
            </label>
            <select
              className="select"
              
              onChange={handleOptionChange}
            >
              {optionsData?.map((option) => (
                <option key={option.id} value={option.id} >{option.name}</option>
              ))}
            </select>
          </div>
          </div>
          <div className="guid">
            <span className="tag">Allow Points</span>
            <label>
              <input
                className="inputs"
                type="checkbox"
                value={allow_points}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <div className="footer_dialog2">
            <Footer_Dialog onClick1={handleClose} onClick2={handleSubmit} />
          </div>
       
      </div>):(
        <div className="trip_container">
          <div className="ggg">
                <img src={i} alt="" />
      <div className="button">
      <button onClick={goToServicesPage}>close</button>    
      </div>
      </div>
        </div>
      )}
    </Dialog>
  );
}

export default Add_Trip;
