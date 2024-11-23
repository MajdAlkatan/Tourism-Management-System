import './Header.css';
import image2 from './../../assets/image_profile.svg';
import image1 from './../../assets/logo.svg';
import {  FaMoon } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate=useNavigate()
  const goToNotification=()=>{
    navigate('/not')
  }

  return (
    <div className='header'>
      <div className='logo'>
      <img  src={image1} alt="" />
      </div>
      
      <ul>
        <li>
          <button className='button-theme' onClick={() => {/* Theme toggle logic */}}>
            <FaMoon size={30} />
          </button>
        </li>
        <li>
          <div className="red-circle">
          <div className="number-container">1</div>

          </div>
            <IoNotifications size={30} color="yellow" onClick={goToNotification} />
        </li>
        <li>
          <div className="profile-image">
            <img src={image2} alt="Profile Image" />
          </div>
        </li>
      </ul>

    </div>
  )
}

export default Header
