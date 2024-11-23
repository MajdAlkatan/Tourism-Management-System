import { Dialog } from '@mui/material'
import './Ticket.css'
import ticketimage from '../../assets/ticket.svg'
import Inputs from '../../Components/input/normalinput/inputs'
import PriceInput from '../../Components/input/PriceInput/PriceInput'
import { useState } from 'react'
import { Calendar } from 'primereact/calendar'
import Footer_Dialog from '../../Components/Footer_Dialog/Footer_Dialog'
import { useDispatch } from 'react-redux'
import { addTicket } from './TicketSlice'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
function Ticket() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleCurrencySelect = (currency) => {
        setPriceCurrency(currency);
      };
    const { id } = useParams();

    const [tourId, setTourId] = useState(null);
    useEffect(() => {
      if (id) {
        setTourId(id);
      }
    }, [id]); 
    
    const handlesubmit=()=>{
        console.log(pricecurrency)
        

        dispatch(addTicket({
            price,
            description,
            name,
            stock,
            pointsDiscount,
            validuntil,
            pointsDiscountPrice,
            id:tourId,
            pricecurrency

        }))
    }

    const goToTour = () => {
navigate(-1)      
};
      
 
    const [price,setPrice]=useState('');
    const [pricecurrency,setPriceCurrency]=useState('');

    const [description,setDescription]=useState('');
    const [name,setName]=useState('');
    const [stock,setStock]=useState('');
    const [pointsDiscount,setPointsDiscount]=useState('');
    const [pointsDiscountPrice,setPointsDiscountPrice]=useState('');
    const [validuntil,setValidUntil]=useState('');


    const handleDateChange = (e) => {
        const date = new Date(e.value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
        const year = date.getFullYear();
        
        // Format the date as YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;    
            setValidUntil(formattedDate);
      };

  return (
    <Dialog open={open}>
    <div className='add_ticket'>
      <div className='image-ticket'>
        <img src={ticketimage} alt="" />
      </div>
      <div className='inputss' >
      <div className='calendar-container'>
       <label className='calendar-border-label'>Date</label>
       <Calendar  onChange={handleDateChange}  dateFormat="dd-mm-yy" baseZIndex={2000} selectionMode="range"/>
               
       </div>
      <Inputs placeholder='name' type='text' onChange={(e)=>setName(e.target.value)}/>
      <Inputs placeholder="stock" type='number' onChange={(e)=>setStock(e.target.value)}/>
      <Inputs placeholder="points discount" type='number' onChange={(e)=>setPointsDiscount(e.target.value)}/>
        <Inputs placeholder='description' type='text' onChange={(e)=>setDescription(e.target.value)}/>
        <Inputs placeholder='points discount price' type='number' onChange={(e)=>setPointsDiscountPrice(e.target.value)}/>
       <PriceInput onChange={(e) => setPrice(e.target.value)} onCurrencySelect={handleCurrencySelect}/>
    
      </div>
      <div>
      <Footer_Dialog onClick1={goToTour} onClick2={handlesubmit}/>

      </div>

    </div>
    </Dialog>
  )
}

export default Ticket
