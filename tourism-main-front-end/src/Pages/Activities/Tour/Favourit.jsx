import './Tours.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { User } from '../Site/Site_Page';
import { Favourite } from "../Site/Site_Page";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Dialog } from '@mui/material';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";
function FavouritPage() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const params = useParams();
  let [DialogOpen, setDialogOpen] = useState(true);

  useEffect(() => {
    dispatch(User());
  }, [dispatch]);
  useEffect(() => {
    dispatch(Favourite(params.id));
  }, [dispatch, params.id]);
  const handleClose = () => {
    setDialogOpen(false);
    navigate(-1);

  };

  const Fav = useSelector((state) => state.site.fav.results?.map(fav => fav.user) || []); // Extract user IDs from Fav

  const Data = useSelector(state => state.site.user.results?.filter(data => Fav.includes(data.user))); 
console.log(Fav)
  console.log(Data); // Logging the data for debugging purposes

  return (
    
      <Dialog open={DialogOpen} onClose={''}>
        <div className='favourit_container'>
          <div className='iconn'>
          <FontAwesomeIcon
            icon={["fas", "times"]}
            style={{ color: "white", fontSize: "24px", paddingTop: "20px" }}
            onClick={handleClose}

          />
          </div>
          {Data?.map((data) => (
            <div key={data.id} className='favourit'>
              <div className='prof'>
                <img src={data.avatar} alt="" />
                <h4>{data.bio}</h4>
              </div>
              <div className='date'>
                <span>{Fav?.created}</span>
              </div>
            </div>
          ))}
          </div>
      </Dialog>
    
  );
}

export default FavouritPage;
