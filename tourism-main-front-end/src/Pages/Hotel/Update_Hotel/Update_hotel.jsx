import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Inputs from "../../../Components/input/normalinput/inputs";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Rating from '@mui/material/Rating';
import Switch from "@mui/material/Switch";
import Footer_Dialog from '../../../Components/Footer_Dialog/Footer_Dialog';
import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../Add_Hotel/Add_Hotel.css';
import  {HotelPage}  from '../Hotel-Page/hoteldelete';
import { useParams } from 'react-router-dom';
import {UpdateHot} from '../Hotel-Page/hoteldelete'

const Update_Hotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Data = useSelector((state) => state.deletehotel?.hot);

  const params=useParams();
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(`${Data.star}`);
  const [hotelType, setHotelType] = useState(Data?.type || 'defaultType'); // Provide a default value
  const [design, setDesign] = useState(`${Data.desgen}`);
  const [allowPoints, setAllowPoints] = useState(`${Data.allow_review}`);
  const [allowReview, setAllowReview] = useState(`${Data.allow_review}`);
  const [refundRate, setRefundRate] = useState(`${Data.refund_rate}`);
  const [upfrontRate, setUpfrontRate] = useState(`${Data.upfront_rate
  }`);
  const [pointsGift, setPointsGift] = useState(`${Data.points_gift}`);
  const [hotelName, setHotelName] = useState(`${Data.name}`);
  const [hotelDescription, setHotelDescription] = useState(`${Data.description}`);
  const [address, setAddress] = useState(`${Data.address?.raw}`);

  const handleClose = () => {
    setOpen(false);
    navigate('/hotel-dashboad');
  };

  useEffect(()=>{
    dispatch(HotelPage(params.id));

  },[dispatch,params.id])

console.log(Data)


  const handleSubmit = () => {
    const hotelData = {
      name: hotelName,
      description: hotelDescription,
      type: hotelType,
      desgen:design,
      refund_rate: refundRate,
      upfront_rate: upfrontRate,
      points_gift: pointsGift,
      allow_points: allowPoints,
      allow_review: allowReview,
      stars: value,
      address:address,
      id:params.id,
    };

    dispatch(UpdateHot(hotelData))

  };

  return (
    <Dialog open={open} className="dialog">
      <div className="add-hotel-container">
        <div className="hotel-form">
          <div className="name_hotel">
            <Inputs
              type="text"
              placeholder="Enter Hotel Name"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
            />
          </div>
          <div className="description_hotel">
            <Inputs
              type="text"
              placeholder="Enter Hotel Description"
              value={hotelDescription}
              onChange={(e) => setHotelDescription(e.target.value)}
            />
          </div>
        </div>

        <span className="tag">Tags</span>

        <div className="tags">
          <div className="rate">
            <span className="number-of-star"><p>Number of Stars :</p></span>
            <Rating 
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <div className="radio-buttons-container">
            <span className="place">Type:</span>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="hotel-type"
                name="hotel-type-group"
                value={hotelType}
                onChange={(e) => setHotelType(e.target.value)}
              >
                <FormControlLabel value="Hotel" control={<Radio />} label="Hotel" />
                <FormControlLabel value="Apartment" control={<Radio />} label="Apartment" />
                <FormControlLabel value="Chalet" control={<Radio />} label="Chalet" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="radio-buttons-container">
            <span className="place">Design :</span>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="design"
                name="design-radio-group"
                value={design}
                onChange={(e) => setDesign(e.target.value)}
              >
                <FormControlLabel value="Modern" control={<Radio />} label="Modern" />
                <FormControlLabel value="Old" control={<Radio />} label="Old" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div className="rates">
          <div className="rate-input">
            <Inputs
              type="number"
              placeholder="Refund Rate"
              value={refundRate}
              onChange={(e) => setRefundRate(e.target.value)}
            />
          </div>
          <div className="rate-input">
            <Inputs
              type="number"
              placeholder="Upfront Rate"
              value={upfrontRate}
              onChange={(e) => setUpfrontRate(e.target.value)}
            />
          </div>
        </div>

        <div className="rate-input">
          <Inputs
            type="number"
            placeholder="Points Gift"
            value={pointsGift}
            onChange={(e) => setPointsGift(e.target.value)}
          />
        </div>
        
        <span className="tag">Location</span>
        <div className="address">
          <Inputs
            type="text"
            placeholder="Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <span className="tag">Options</span>
        <div className="services">
          <FormControlLabel
            control={<Switch checked={allowPoints} onChange={() => setAllowPoints(!allowPoints)} />}
            label="Allow Points"
          />
          <FormControlLabel
            control={<Switch checked={allowReview} onChange={() => setAllowReview(!allowReview)} />}
            label="Allow Review"
          />
        </div>
        
        <div className='footer_dialog2'>
          <Footer_Dialog onClick2={handleSubmit} onClick1={handleClose}/>
        </div>
      </div>
    </Dialog>
  );
};

export default Update_Hotel;
