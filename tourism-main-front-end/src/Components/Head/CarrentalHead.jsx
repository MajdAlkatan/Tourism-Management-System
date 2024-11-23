// import { useNavigate } from 'react-router-dom'; 
import './Head.css'
import Car_Rental from './../../assets/Car_rental.svg'

function CarrentalHead() {
    // let navigate = useNavigate(); // Use the useNavigate hook

    // const goToAddHotelPage = () => {
    //   navigate('/add-hotel'); // Replace '/add-hotel' with the actual route to your Add Hotel page
    // };
    return (
      <>
      <div className="head">
        <div className="title">
          <div>
          <h1>Car Rental Dashboard</h1>
          <h2>Here’s what’s going on at your business right now</h2>
          </div>
        
        </div>
        <div className="image">
          <img src={Car_Rental} alt="" />
  
        </div>
  
      </div>
      <div className='buttons'>
      <div className='button'> 
          <button onClick={''}>Add Car</button>
          </div>
          </div>
      <hr />
      </>
    )
}

export default CarrentalHead