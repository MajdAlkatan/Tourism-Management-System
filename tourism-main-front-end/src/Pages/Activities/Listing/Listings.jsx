import "./Listings.css";
import { Dialog } from "@mui/material";
import Inputs from "../../../Components/input/normalinput/inputs";
import ImageInput from "../../../Components/input/imageinput/imageinput";
import { useState } from "react";
import Footer_Dialog from "./../../../Components/Footer_Dialog/Footer_Dialog";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ActivitesPage } from "../Activities_dashboard/Activites_Page";
import { Listing } from "../Add_Trip/Add_TripSlice";

function Add_Trip() {
  const [name, setName] = useState("");
  const [refund_rate, setRefundRate] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [site_id, setSite_Id] = useState("");
  const [allow_points, setAllowPoints] = useState("");
  const [photos, setPhotos] = useState("");
  const [points_gift, setPointGift] = useState("");
  const [time, setTime] = useState("");
  const [Website, setWebsite] = useState("");
  const [  work_hours , setworkHours] = useState("");




  const [open, setOpen] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ActivitesPage());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
    navigate("/activities");
  };
  const Sites=useSelector((state)=>state.activites.data.results);

  const handleOptionChange = (event) => {
    
    const idAndName = event.target.value.split(' '); 
    const siteId = idAndName[0]; 
    setSite_Id(siteId);
    console.log(siteId); 
  };
  
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
      
      refund_rate,
      description,
      allow_points,
      points_gift,
      site_id,
      time,
      Website,
    work_hours,
dispatch(Listing({   name,
    photos,
    
    refund_rate,
    description,
    allow_points,
    points_gift,
    site_id,
    time,
    Website,
  work_hours})))
navigate('/activities')
  };

  const onFilesSelected = (event) => {
    setPhotos(Array.from(event.target.files));
  };
  
  


  
  

  const handleCheckboxChange = (event) => {
    setAllowPoints(event.target.checked);

    console.log(event.target.checked);
  };

  return (
    <Dialog open={open} scroll="paper" classes={{ paper: 'my-custom-dialog' }}>
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
            onChange={(e) => setDescription(e.target.value)}
          />
              <Inputs
            placeholder="Website"
            type="text"
            onChange={(e) => setWebsite(e.target.value)}
          />
               <Inputs
            placeholder="works houre"
            type="number"
            onChange={(e) => setworkHours(e.target.value)}
          />
                    <Inputs
            placeholder="opens at"
            type="text"
            onChange={(e)=>setTime(e.target.value)}
            placeholde="HH:MM:SS"

          />
          <div className="coolinput">
            <label htmlFor="input" className="text">
              Choose Site
            </label>
            <select
              className="select"
              
              onChange={handleOptionChange}
            >
              {Sites?.map((option) => (
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
       
      </div>
    </Dialog>
  );
}

export default Add_Trip;
