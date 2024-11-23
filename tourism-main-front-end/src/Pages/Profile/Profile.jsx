import './Profile.css'
import { FaEdit } from 'react-icons/fa';
import imageUrl from '../../assets/image_profile.svg'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    let navigate = useNavigate(); 

    const goToHotelPage = () => {
        navigate('/Edit_profile'); 
      };

  return (
    
    <div className='profile'>
        <div className='avatar'>
        <img src={imageUrl} alt={''}  className='img'/>
        
        <span>hazem</span>
        <span>Email</span>
       
        </div>
        <div onClick={goToHotelPage} className='avatar2'>
        
        <span>Edit Profile </span> 
        
        <FaEdit className="nav-icon" /> 
        
       
        
        </div>
        </div>
    
  )
}

export default Profile
