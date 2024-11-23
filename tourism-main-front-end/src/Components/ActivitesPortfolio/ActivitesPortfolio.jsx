import PropTypes from "prop-types";
import Slider from "react-slick";
import './ActivitesPortfolio.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function truncateText(text, maxWords) {
  if (!text) return ''; // تأكد من وجود النص
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
}

function ActivitesPortfolio({ images, onClickNav }) {
  if (!Array.isArray(images)) {
    console.error('Expected images prop to be an array', images);
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
        {images.map((image) => (
          <div key={image.id} className="box" onClick={() => onClickNav(image.id)}>
            <img src={image.photo} alt={image.caption || 'Image'} />
            <div className="caption">
              <h4>{truncateText(image.title, 10)}</h4>
              <p>{truncateText(image.description, 10)}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

ActivitesPortfolio.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    photo: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    description: PropTypes.string
  })).isRequired,
  onClickNav: PropTypes.func.isRequired,
};

export default ActivitesPortfolio;
