// src/components/Footer.js
import './Footer.css';
import imagefooter from './../../assets/footer.svg';
import { useTranslation } from '../../../translationUtility'; // Adjust the path according to your file structure

const Footer = () => {
  const { t } = useTranslation(); // Use the custom hook to get the t function

  return (
    <div className='footer'>
      <span>{t('navbar.foote')}</span>
      <div className='imagee'>
        <img src={imagefooter} alt="Footer" />
      </div>
    </div>
  );
};

export default Footer;
