import PropTypes from "prop-types";
import Slider from "react-slick";
import './ActivitesPortfolio.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ActivitesPortfolio2({ activities, onClickNav }) {
  if (!Array.isArray(activities)) {
    console.error('Expected activities prop to be an array', activities);
    return null; 
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <div className="portfolio">
      <Slider {...settings} className="imgs-container">
        {activities.map((activity) => (
          <div key={activity.id} className="box" onClick={() => onClickNav(activity.id)}>
            {activity.photos.length > 0 && (
              <img src={activity.photos[0].image} alt="" key={activity.photos[0].id} />
            )}
            <div className="caption">
              <h4>{activity.name}</h4>
              {/* Truncate the description to the first 10 words */}
              <p>{activity.description.split(/\s+/).slice(0, 7).join(' ') + '...'}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

ActivitesPortfolio2.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })),
  })).isRequired,
  onClickNav: PropTypes.func.isRequired,
};

export default ActivitesPortfolio2;
