import "./Category.css";
import { Dialog } from "@mui/material";
import Inputs from "../../../../Components/input/normalinput/inputs";
import Footer_Dialog from "../../../../Components/Footer_Dialog/Footer_Dialog";
import { useNavigate } from "react-router-dom";
import { CategoryPage } from "../../ServicesSlice";
import { useDispatch } from "react-redux";
import {  useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material"; 
import { useSelector } from "react-redux";
import i from '../../../../assets/Green-check-mark-icon.png'
import {resetSuccess}  from '../../ServicesSlice'; 

function Category() {
  const navigate = useNavigate();
  const goToServicesPage = () => {
    navigate("/services");
  };

const success = useSelector((state) => state.services?.success);
console.log(success)
const error = useSelector((state) => state.services?.error);
console.log(error)
console.log(success)
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [istrue,setTrue] = useState(false);


  const dispatch=useDispatch();
  useEffect(() => {
    if (success) {
      setTrue(true);
      dispatch(resetSuccess());
    }
  }, [success,dispatch]);
   const handlesubmit=( event)=>{
    event.preventDefault();

    dispatch(CategoryPage({name,type}));

  
  }


 

  return (
    <Dialog open={open}>
     {!istrue ? ( <div className="add_category ">
        
        <span>Add Category</span>
        <Inputs placeholder="name" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <Select
          labelId="ham"
          id="demo-simple-select"
          value={type}
          label="Property"
          onChange={(e) => setType(e.target.value)}
          variant="outlined"
          className="select-as-input" 
  
        
        >
          <MenuItem value={'Property'}>Property</MenuItem>
          <MenuItem value={'SupProperty'}>SupProperty</MenuItem>
          <MenuItem value={'Activity'}>Activity</MenuItem>
        </Select>        <div className="d">
          <Footer_Dialog onClick1={goToServicesPage} onClick2={handlesubmit} />
        </div>
      </div>
      ):(
        <div className="add_category ">
          <img src={i} alt="" />
          <div className="button">
          <button onClick={goToServicesPage}>close</button>    
          </div>

</div>
      )}
    </Dialog>
  );
}

export default Category;
