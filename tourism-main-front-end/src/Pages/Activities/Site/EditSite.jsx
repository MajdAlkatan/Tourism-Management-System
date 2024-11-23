import '../Add_Site/Add_Site.css'
import { Dialog } from '@mui/material'
import Inputs from '../../../Components/input/normalinput/inputs'
import ImageInput from '../../../Components/input/imageinput/imageinput'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer_Dialog from './../../../Components/Footer_Dialog/Footer_Dialog'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { SitePage, UpdatePage } from './Site_Page'
function EditSite() {
  const params=useParams()
    const Data = useSelector(state => state.site.data);
    console.log(Data.name)
    const [photo, setPhoto] = useState(`${Data.photo}`); 
  const [name, setName] = useState(`${Data.name}`); 
  const [description, setDescription] = useState(`${Data.description}`); 
  const [address, setAddress] = useState(`${Data.address?.raw}`); 
  const [street, setStreet] = useState(`${Data.address?.street_number}`); 
  const [route, setRoute] = useState(`${Data.address?.route}`); 


  const dispatch = useDispatch();
 useEffect(() => {
    dispatch(SitePage(params.id));
  }, [dispatch,params.id]);

  const [open, setOpen] = useState(true); 
  let navigate = useNavigate();


  const handleClose = () => {
    setOpen(false);
    navigate('/activities'); 
    
    
  };

  const [tourId, setTourId] = useState(null);
  useEffect(() => {
    if (params.id) {
      setTourId(params.id);
    }
  }, [params.id]); 
  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");

    console.log(

      name,
        photo,
       address,
        description,
        route,
        street
    );
    dispatch(
      UpdatePage({
      
        name,
        id:tourId,

        photo,
       address,
        description,
        route,
        street
      
        
      })
    );
  };

  return (
   <Dialog open={open} onClose={handleClose}>
    
    <div className='site_container'>
    
        <div className='name_and_image'>
       <Inputs value={name} placeholder='Enter site name' type='text' onChange={(e)=>setName(e.target.value)}/>
       <ImageInput values={photo} onFilesSelected={(e)=>setPhoto(e.target.files[0])}/>
       </div>
       <div className='inputss'>
<Inputs type='text' value={description} placeholder='description' onChange={(e)=>setDescription(e.target.value)}/>
<Inputs type='text' value={address} placeholder='raw' onChange={(e)=>setAddress(e.target.value)}/>
<Inputs type='text' value={route} placeholder='route' onChange={(e)=>setRoute(e.target.value)}/>
<Inputs type='text' value={street} placeholder='street number' onChange={(e)=>setStreet(e.target.value)}/>


       </div>

       <div className='footer_dialog'>
       <Footer_Dialog onClick1={handleClose} onClick2={handleSubmit2}/>
       </div>
    
  
     
    </div>
 
   </Dialog>
  )
}

export default EditSite
