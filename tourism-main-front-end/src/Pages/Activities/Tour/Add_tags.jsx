import { Dialog } from '@mui/material'
import './Tours.css'
import Footer_Dialog from '../../../Components/Footer_Dialog/Footer_Dialog'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addTags } from '../Site/Site_Page';
import { useDispatch } from 'react-redux';
import { TagsPage } from '../../Services/ServicesSlice';
import { ServicesPage } from '../../Services/ServicesSlice';
function AddTags() {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(TagsPage())

    },[dispatch])
    const [tag_id, setTag_Id] = useState("");
   const params=useParams()
    const navigate=useNavigate();
    const goToTourPage=()=>{
        navigate(-1)
    }

    useEffect(() => {
      dispatch(ServicesPage());
    
      dispatch(TagsPage());
    }, [dispatch]);

    const handlesubmit=()=>{
        console.log(tag_id)
     dispatch(addTags({tag_id,id:params.id}))
    }
    const handleOptionChange = (event) => {

        const idAndName = event.target.value.split(' '); 
        const tag_id = idAndName[0]; 
        setTag_Id(tag_id);
        console.log(tag_id); 
      };
      const Tags=useSelector(state=>state.services.servicesData.results?.filter(tag => tag.type === 'activity'))
      return (
    <Dialog open={open} classes={{ paper: 'my-custom-dialog' }}>
       <div className="add_tag ">
        <span>Add Tag</span>
        <div className="coolinput">
            <label htmlFor="input" className="text">
              select tag
            </label>
            <select
              className="select"
              onChange={handleOptionChange}
            >
              {Tags?.map((option) => (
                <option key={option.id} value={option.id} >{option.name}</option>
              ))}
            </select>
          </div>   
               <div className="d">
          <Footer_Dialog onClick1={goToTourPage} onClick2={handlesubmit} />
        </div>
        </div>
    </Dialog>
    
  )
}

export default AddTags
