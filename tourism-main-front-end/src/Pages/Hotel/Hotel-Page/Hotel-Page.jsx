import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useTranslation } from '../../../../translationUtility';
import './Hotel-Page.css';
import Head2 from '../../../Components/Head/Head2';
import { Portfolio, Statistics1, Statistics2, Statistics3, Statistics4 } from '../../../Components';
import s3 from '../../../assets/hotel-dashboard.svg';
import { deleteHotel } from './hoteldelete';
import { Delete } from "../../../Components/index";
import { baseurl } from '../../../App';

const Hotel_Page = ({ hotels = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.currentLanguage); // Get current language from Redux state
  const { t } = useTranslation(); // Use the translation hook

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  // Fetch the hotel from the prop or API
  useEffect(() => {
    const fetchHotel = async () => {
      let foundHotel = hotels.find(hotel => hotel.id === parseInt(id));
      
      if (!foundHotel) {
        try {
          const response = await axios.get(`${baseurl}/services/properties/${id}/`, {
            headers: {
              'Accept-Language': currentLanguage, // Set Accept-Language header
            },
          });
          foundHotel = response.data;
        } catch (error) {
          console.error('Error fetching hotel data:', error);
        }
      }

      if (foundHotel) {
        setHotel(foundHotel);
      }
    };

    fetchHotel();
  }, [id, hotels, currentLanguage]);

  useEffect(() => {
    if (hotel) {
      axios.get(`${baseurl}/services/properties/sup-properties/?property_id=${hotel.id}`, {
        headers: {
          'Accept-Language': currentLanguage, // Set Accept-Language header
        },
      })
        .then(response => setRooms(response.data.results))
        .catch(error => console.error('Error fetching rooms:', error));
    }
  }, [hotel, currentLanguage]);

  if (!hotel) {
    return <div>{t('hotelNotFound')}</div>;
  }

  const handleDelete = () => {
    if (window.confirm(t('confirmDelete', { name: hotel.name }))) {
      dispatch(deleteHotel(hotel.id));
      navigate('/hotels');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
        ></div>
      );
    }
    return stars;
  };

  const gotoaddroom = () => {
    navigate('/add-room');
  };

  const gotoupdateHotel = () => {
    navigate(`/update-hotel/${id}`);
  };

  return (
    <div>
      <Head2
        image={s3}
        Title={hotel.name}
        subTitle="Here’s what’s going on at your business right now"
        titleButton1={t('navbar.addRoom')}
        titleButton2={t('navbar.updateHotel')}
        onClickNavigation={gotoaddroom}
        onClickNavigation2={gotoupdateHotel}
      />
      
      <div className="hotel-info">
        <div className="image-gridss">
          {hotel.photos.map((photo, index) => (
            <div key={index} className="grid-itemss">
              <img src={photo.image} alt={`hotel ${index + 1}`} />
            </div>
          ))}
        </div>
  
        {/* Add the hotel description here */}
        <div className="hotel-description">
          <h3>{t('hotelDescription')}</h3>
          <p>{hotel.description}</p>
        </div>
  
        <div className="hotel-details">
          <div className="details-grid">
            <div className="hotel-policies">
              <h3>{t('hotelPolicies')}</h3>
              <p><strong>{t('navbar.refundRate')}:</strong> {hotel.refund_rate}%</p>
              <p><strong>{t('navbar.upfrontRate')}:</strong> {hotel.upfront_rate}%</p>
            </div>
            
            <div className="guest-experience">
              <h3>{t('navbar.guestExperience')}</h3>
              <p>12-Point Gift Program {hotel.points_gift ? '✔️' : '❌'}</p>
              <p>{t('navbar.pointsRedemption')} {hotel.allow_points ? '✔️' : '❌'}</p>
              <p>{t('navbar.reviews')} {hotel.allow_review ? '✔️' : '❌'}</p>
            </div>
            
            <div className="ratings">
              <h3>{t('navbar.ratings')}</h3>
              <div className="star-rating">
                {renderStars(hotel.star)}
              </div>
              <p>{hotel.avg_rating ? hotel.avg_rating : '-'}</p>
              <p>{hotel.num_rating ? `${hotel.num_rating} ${t('navbar.ratings')}` : t('navbar.noRatings')}</p>
            </div>
            
            <div className="discount-container">
              <h3>{t('navbar.discounts')}</h3>
              <ul>
                {hotel.on_discount.map((discount, index) => (
                  <li key={index} className="discount-item">
                    <p><strong>{discount.event ? discount.event : t('navbar.discount')}:</strong> {discount.percent}%</p>
                    <p>{discount.type}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
  
        <Portfolio 
          images={rooms.map(room => ({
            name: room.name,
            description: room.description,
            photos: room.photos,
          }))}
          onClickNav={(index) => {
            navigate(`/room_page/${rooms[index].id}`);
          }} 
        />
  
        <div className="statistics">
          <Statistics1
            series1={10}
            series2={20}
            series3={30}
            series4={40}
            series5={50}
            series6={60}
            px1={2020}
            px2={2021}
            px3={2022}
            px4={2023}
            px5={2024}
            px6={2025}
          />
          <Statistics2
            value1={400}
            value2={200}
            value3={300}
            value4={500}
            label1={t('navbar.groupA')}
            label2={t('navbar.groupB')}
            label3={t('navbar.groupC')}
            label4={t('navbar.groupD')}
          />
          <Statistics3
            a1={2}
            a2={3}
            a3={4}
            a4={1}
            a5={2}
            b1={4}
            b2={4}
            b3={2}
            b4={1}
            b5={2}
            c1={5}
            c2={6}
            c3={3}
            c4={7}
            c5={1}
          />
          <Statistics4
            uv1={-15.69}
            uv2={-20.63}
            uv3={89.22}
            uv4={190.67}
            uv5={286.69}
            uv6={76.63}
            uv7={31.47}
          />
        </div>
  
        <Delete onClick={handleDelete} />
      </div>
    </div>
  );
};

// Prop validation
Hotel_Page.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      refund_rate: PropTypes.string.isRequired,
      upfront_rate: PropTypes.string.isRequired,
      points_gift: PropTypes.number.isRequired,
      allow_points: PropTypes.bool.isRequired,
      allow_review: PropTypes.bool.isRequired,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.string.isRequired,
        })
      ).isRequired,
      avg_rating: PropTypes.number,
      num_rating: PropTypes.number.isRequired,
      on_discount: PropTypes.arrayOf(
        PropTypes.shape({
          percent: PropTypes.string.isRequired,
          event: PropTypes.string,
          type: PropTypes.string.isRequired,
        })
      ).isRequired,
      address: PropTypes.shape({
        raw: PropTypes.string.isRequired,
      }).isRequired,
      star: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      desgen: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Hotel_Page;
