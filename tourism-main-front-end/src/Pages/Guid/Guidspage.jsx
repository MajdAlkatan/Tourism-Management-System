import { useEffect, useState } from 'react';
import Head1 from "../../Components/Head/Head1";
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../Components/index';
import { baseurl } from '../../App';

function Guidspage() {
  const navigate = useNavigate(); // Use navigate here
  const [guidesData, setGuidesData] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/services/activities/guides/`)
      .then(response => response.json())
      .then(data => {
        setGuidesData(data.results);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const goToAddGuid = () => {
    navigate('/Add_Guid');
  };

  const goToGuiddetails = (id) => {
    navigate(`/guid/${id}`);
  };

  const images = guidesData.map(guide => guide.avatar);
  const names = guidesData.map(guide => guide.name);
  const ids = guidesData.map(guide => guide.id);

  return (
    <div>
      <Head1 
        Title="Guide Dashboard"
        subTitle="Here’s what’s going on at your business right now"
        image={"Guid"}
        titleButton1="Add Guide"
        onClickNavigation={goToAddGuid}
      />
      <UserProfile images={images} names={names} ids={ids} navigate={goToGuiddetails} />
    </div>
  );
}

export default Guidspage;
