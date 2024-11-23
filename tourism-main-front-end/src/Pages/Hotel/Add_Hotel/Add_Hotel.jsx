import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHotel } from './hotelSlice';
import Inputs from "../../../Components/input/normalinput/inputs";
import MultiImageUpload from "../../../Components/input/imageinput/imageinput2/imageinput2";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Rating from '@mui/material/Rating';
import Switch from "@mui/material/Switch";
import Footer_Dialog from '../../../Components/Footer_Dialog/Footer_Dialog';
import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './Add_Hotel.css';

const Add_Hotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(0);
  const [hotelType, setHotelType] = useState("Hotel");
  const [design, setDesign] = useState("Modern");
  const [allowPoints, setAllowPoints] = useState(false);
  const [allowReview, setAllowReview] = useState(false);
  const [refundRate, setRefundRate] = useState('');
  const [upfrontRate, setUpfrontRate] = useState('');
  const [pointsGift, setPointsGift] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [hotelDescription, setHotelDescription] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]); // State for storing image files

  const handleClose = () => {
    setOpen(false);
    navigate('/hotel-dashboad');
  };

  const handleImageChange = (selectedImages) => {
    setImages(selectedImages);
  };

  const handleSubmit = () => {
    const hotelData = {
      name: hotelName,
      description: hotelDescription,
      type: hotelType,
      design,
      refund_rate: refundRate,
      upfront_rate: upfrontRate,
      points_gift: pointsGift,
      allow_points: allowPoints,
      allow_review: allowReview,
      stars: value,
      address: {
        raw: address,
      },
      images, // Include image files in the form data
    };

    dispatch(addHotel(hotelData))
      .unwrap()
      .then(() => {
        navigate('/hotel-dashboard');
      })
      .catch((error) => {
        console.error('Failed to add hotel:', error);
      });
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
          <MultiImageUpload onImagesChange={handleImageChange} /> {/* Pass image handler to the component */}
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

export default Add_Hotel;
