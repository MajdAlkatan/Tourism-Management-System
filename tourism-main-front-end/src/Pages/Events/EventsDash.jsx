import Head1 from "../../Components/Head/Head1";
import Event from "../../assets/Event.svg";
import { useNavigate } from 'react-router-dom';
import EventList from "./EventList.jsx"
import { baseurl } from '../../App.jsx';

function EventsDash() {
  const navigate = useNavigate();
  const goToAddEvent = () => {
    navigate('/Add_Event');
  };

  return (
    <div>
      <Head1 
        Title="Event DashBoard"
        subTitle="Here’s what’s going on at your business right now"
        image={Event}
        titleButton1="Add Event"
        onClickNavigation={goToAddEvent}
      />
      <EventList />
    </div>
  );
}

export default EventsDash;