import './Tags.css'
import { Dialog } from '@mui/material'
import Inputs from '../../../Components/input/normalinput/inputs'
import Footer_Dialog from '../../../Components/Footer_Dialog/Footer_Dialog'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AddTagsPage } from '../ServicesSlice'
import { useState } from 'react'
import {resetSuccess}  from '../../Services/ServicesSlice'; 
import { useEffect } from 'react'
import i from '../../../assets/Green-check-mark-icon.png'

function Tags() {
  const cat_id=useSelector(state=>state.services.servicesData?.results)
  const success = useSelector((state) => state.services?.success);
  console.log(success)
  const dispatch=useDispatch();

  console.log(cat_id)
    const navigate=useNavigate()
    const goToServicesPage=()=>{
        navigate('/services')
    }
    const [name, setName] = useState("");
    const [contenttype, setContenttype] = useState("");
    const [category, setCategory] = useState("");
    const [istrue,setTrue] = useState(false);
    useEffect(() => {
      if (success) {
        setTrue(true);
        dispatch(resetSuccess());
      }
    }, [success,dispatch]);

    const handlesubmit=()=>{
      dispatch(AddTagsPage({name,contenttype,category}))

    }
 
    const handleOptionChange = (event) => {

      const idAndName = event.target.value.split(' '); 
      const categoryId = idAndName[0]; 
      setCategory(categoryId);
      console.log(categoryId); 
    };
  return (

   <Dialog open={open}>
    {!istrue ? (
    <div className='add_tagg'>
        <span>Add Tag</span>
    <Inputs placeholder='name' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
    <Inputs placeholder='contenttype' type="text" value={contenttype} onChange={(e)=>setContenttype(e.target.value)}/>
    <div className='option'>
    <div className="coolinput">
            <label htmlFor="input" className="text">
              Choose category
            </label>
            <select
              className="select"
              onChange={handleOptionChange}
            >
              <option>{""}</option>
            {cat_id?.map((option) => (
                <option key={option.id} value={option.id} >{option.name}</option>
              ))}

              ))
            </select>
          </div>
          </div>
    <div className='d'>
    <Footer_Dialog onClick1={goToServicesPage} onClick2={handlesubmit}/>
    </div>

    
    </div>
    ):(      
    <div className="add_category ">
      <img src={i} alt="" />
      <div className="button">
      <button onClick={goToServicesPage}>close</button>    
      </div>

</div>

    )
}
   </Dialog>
  )
}

export default Tags
