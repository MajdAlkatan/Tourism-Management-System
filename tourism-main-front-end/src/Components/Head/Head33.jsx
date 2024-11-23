import './Head.css'
import PropTypes from 'prop-types'; 

function Head3({image,Title,subTitle,titleButton1,onClickNavigation,titleButton2,onClickNavigation3,titleButton3,onClickNavigation2}) {



  return (
    <>
      <div className="head">
        <div className="titlebuttons">
          <div className="title">
            <div>
              <h1>{Title}</h1>
              <h2>{subTitle}</h2>
            </div>
          </div>
          <div className='buttons'>
            <div className='button'>
              <button onClick={onClickNavigation}>{titleButton1}</button>
            </div>
            <div className='button'>
              <button onClick={onClickNavigation2}>{titleButton2}</button>
            </div>
            <div className='button'>
              <button onClick={onClickNavigation3}>{titleButton3}</button>
            </div>
          
          </div>
        </div>
        <div className="image-head">
          <img src={image} alt="" />
        </div>
      </div>
      <hr />
    </>
  );
}


Head3.propTypes = {
  image: PropTypes.string.isRequired, 
  Title: PropTypes.string.isRequired, 
  subTitle: PropTypes.string.isRequired, 
  titleButton1: PropTypes.string.isRequired, 
  titleButton2: PropTypes.string.isRequired, 
 onClickNavigation: PropTypes.func.isRequired,
 onClickNavigation3: PropTypes.func.isRequired,
 titleButton3: PropTypes.string.isRequired, 


 onClickNavigation2: PropTypes.func,




};
export default Head3
