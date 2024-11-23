import { Dialog } from '@mui/material'
import './Tours.css'
import Footer_Dialog from '../../../Components/Footer_Dialog/Footer_Dialog'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addSites } from '../Site/Site_Page';
import { useDispatch } from 'react-redux';
function AddSites() {
    const dispatch=useDispatch();
    const [site_id, setSite_Id] = useState("");
   const params=useParams()
    const navigate=useNavigate();
    const goToTourPage=()=>{
        navigate(-1)
    }
    const handlesubmit=()=>{
        console.log(site_id)
     dispatch(addSites({site_id,id:params.id}))
    }
    const handleOptionChange = (event) => {

        const idAndName = event.target.value.split(' '); 
        const siteId = idAndName[0]; 
        setSite_Id(siteId);
        console.log(siteId); 
      };
    const Sites=useSelector((state)=>state.activites.data.results);
    return (
    <Dialog open={open}>
       <div className="add_site ">
        <span>Add Sites</span>
        <div className="coolinput">
            <label htmlFor="input" className="text">
              select site
            </label>
            <select
              className="select"
              
              onChange={handleOptionChange}
            >
              {Sites?.map((option) => (
                <option key={option.id} value={option.id} >{option.name}</option>
              ))}
            </select>
          </div>        <div className="d">
          <Footer_Dialog onClick1={goToTourPage} onClick2={handlesubmit} />
        </div>
        </div>
    </Dialog>
    
  )
}

export default AddSites
