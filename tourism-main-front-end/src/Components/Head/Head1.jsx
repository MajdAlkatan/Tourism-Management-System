import './Head.css'
import PropTypes from 'prop-types'; 

function Head1({image,Title,subTitle,titleButton1,onClickNavigation}) {



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


Head1.propTypes = {
  image: PropTypes.string.isRequired, 
  Title: PropTypes.string.isRequired, 
  subTitle: PropTypes.string.isRequired, 
  titleButton1: PropTypes.string.isRequired, 
 onClickNavigation: PropTypes.func.isRequired,



};
export default Head1
