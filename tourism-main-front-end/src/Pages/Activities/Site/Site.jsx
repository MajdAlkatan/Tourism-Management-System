import './Site.css';
import activity_imag from '../../../assets/activities.svg';
import { Statistics5 } from '../../../Components/index';
import Head2 from '../../../Components/Head/Head2';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsPortfolio from '../../../Components/DetailsPortfolio/DetailsPortfolio';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { SitePage } from './Site_Page';
import { useEffect } from 'react';


function Site() {
  
  
    let navigate = useNavigate();
const params=useParams()

    // const goToAddTrip = () => {
    //   navigate('/delete'); 
    // };
    const goToAddSite = () => {
      navigate(`/Site/${params.id}/EditSite/${params.id}`); 
    };
    const goToListing = () => {
        navigate(`/Site/${params.id}/Listing`); 
      };
    const Data = useSelector(state => state.site.data);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(SitePage(params.id));
    }, [dispatch,params.id]);

    return (
        <div className='hh'>
            <Head2
                image={activity_imag}
                Title={Data.name} 
                subTitle='Here’s what’s going on at your business right now'
                titleButton2='Edit Site'
                titleButton1='make Listing'

                onClickNavigation2={goToAddSite}
                onClickNavigation={goToListing}
            />
            <DetailsPortfolio images={Data} onClickNav={''}/>
            <hr className="hr" />

            <div className='Detailses'>
                <div className='details'>
                    <ul>
                    <li>Name:{Data.name}</li>
                    <li>description : {Data.description}</li>
                    <li>raw :{Data.address?.raw}</li>
                    <li>street_number :{Data.address?.street_number}</li>
                    <li>route:{Data.address?.route}</li>
                    </ul>
                </div>
                <Statistics5/>
            </div>
        </div>
    );
}

export default Site;
