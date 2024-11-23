import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloudRain, faSnowflake, faMoon } from '@fortawesome/free-solid-svg-icons';
import CurrencyStockTrends from './CurrencyStockTrends';
import { baseurl } from '../../App';

const Home = () => {
  const [weatherData, setWeatherData] = useState({ current: [], forecast: null });
  const [newsData, setNewsData] = useState([]);
  const [lastServices, setLastServices] = useState([]);
  const [, setNewsImages] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.weatherbit.io/v2.0/current?city=Paris&key=1cd21c13fb9d4aadaaf7fa5acbec46d8');
        const data = await response.json();
        setWeatherData(prevData => ({
          ...prevData,
          current: [{
            city: 'Paris',
            weather: data.data[0].weather.description,
            temp: data.data[0].temp,
            humidity: data.data[0].rh,
            windSpeed: data.data[0].wind_spd,
            icon: data.data[0].weather.icon,
          }],
        }));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchWeatherForecast = async () => {
      try {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=409efe15c87845e2b42131754232011&q=London&days=1&aqi=no&alerts=no');
        const data = await response.json();
        setWeatherData(prevData => ({
          ...prevData,
          forecast: data.forecast.forecastday[0],
        }));
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=c279d2b33786459f87fc4ac95083c250');
        const data = await response.json();
        setNewsData(data.articles.slice(0, 20));
        setNewsImages(data.articles.slice(0, 20).map(article => article.urlToImage));
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    const fetchLastServices = async () => {
      try {
        const response1 = await fetch(`${baseurl}/services/activities/listings/`);
        const data1 = await response1.json();
        const response2 = await fetch(`${baseurl}/services/properties`);
        const data2 = await response2.json();
        const combinedResults = [...data1.results, ...data2.results];
        const latestService = combinedResults.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
        setLastServices(latestService ? [latestService] : []);
      } catch (error) {
        console.error('Error fetching last services:', error);
      }
    };

    fetchWeather();
    fetchWeatherForecast();
    fetchNews();
    fetchLastServices();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const getWeatherClass = (iconCode) => {
    switch (iconCode) {
      case 'c01d': return 'weather-clear';
      case 'c02d': return 'weather-partly-cloudy';
      case 'r01d': return 'weather-rain';
      case 's01d': return 'weather-snow';
      case 'n01d': return 'weather-night';
      default: return 'weather-clear';
    }
  };

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case 'c01d': return faSun;
      case 'c02d': return faCloudSun;
      case 'r01d': return faCloudRain;
      case 's01d': return faSnowflake;
      case 'n01d': return faMoon;
      default: return faSun;
    }
  };

  const viewMoreDetails = (serviceId) => {
    console.log(`View details for service ID: ${serviceId}`);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to Pingoway</h1>
        <p>Your Tourism Management Dashboard</p>
      </header>

      <div className="grid-container">
        <div className="grid-item calendar-item">
          <h2>Calendar</h2>
          <Calendar />
        </div>

        <div className="grid-item services-item">
          <h2>Last Created Services</h2>
          <ul>
            {lastServices.map((service, index) => (
              <li key={index} className="service-item">
                <div className="service-photo">
                  {service.photos && service.photos.length > 0 && (
                    <img src={service.photos[0].image} alt={`Service ${index + 1}`} className="service-image" />
                  )}
                </div>
                <div className="service-details">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <p>Refund Rate: {service.refund_rate}%</p>
                  <p>Points Gift: {service.points_gift}</p>
                  <p>Opening Hours: {service.opens_at} - {service.closes_at}</p>
                  <button  className='b' onClick={() => viewMoreDetails(service.id)}>View More Details</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid-item weather-item">
          {weatherData.current.map((weather, index) => (
            <div key={index} className={`weather-card ${getWeatherClass(weather.icon)}`}>
              <div className="weather-details">
                <div className="icon">
                  <FontAwesomeIcon icon={getWeatherIcon(weather.icon)} size="4x" />
                </div>
                <div className="details">
                  <h3>{weather.city}</h3>
                  <p>{weather.weather}</p>
                  <p>Temperature: {weather.temp}°C</p>
                  <p>Humidity: {weather.humidity}%</p>
                  <p>Wind Speed: {weather.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          ))}
          {weatherData.forecast && weatherData.forecast.day && (
            <div className="weather-forecast">
              <h4>Todays Forecast</h4>
              <div className="forecast-item">
                <p>{weatherData.forecast.date}: {weatherData.forecast.day.condition.text}</p>
                <p>Temperature: {weatherData.forecast.day.avgtemp_c}°C</p>
                <p>Max Temp: {weatherData.forecast.day.maxtemp_c}°C</p>
                <p>Min Temp: {weatherData.forecast.day.mintemp_c}°C</p>
                <p>Wind Speed: {weatherData.forecast.day.maxwind_kph} km/h</p>
                <p>UV Index: {weatherData.forecast.day.uv}</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid-item trends-item">
          <CurrencyStockTrends />
        </div>

        <div className="grid-item quick-actions-item">
          <h2>Quick Actions</h2>
          <div className="quick-links">
            <Link to="http://localhost:5173/activities" className="quick-link">Manage Tours</Link>
            <Link to="http://localhost:5173/hotel-dashboad" className="quick-link">Manage Hotel</Link>
            <Link to="http://localhost:5173/Discountpage" className="quick-link">Manage Descount</Link>
          </div>
        </div>

        <div className="grid-item news-item">
          <h2>Tourism News</h2>
          <Slider {...settings}>
            {newsData.map((article, index) => (
              <div key={index} className="news-slide">
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={`News ${index + 1}`} className="news-image" />
                )}
                <div className="news-content">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <h3>{article.title}</h3>
                  </a>
                  <p>{article.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
