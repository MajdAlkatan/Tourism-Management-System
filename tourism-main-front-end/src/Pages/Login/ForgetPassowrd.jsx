import './Login.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import background from '../../assets/Screenshot (48) 1.png';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPasssowrd} from './LoginSlice';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import check from '../../assets/Green-check-mark-icon.png'

const ForgetPassowrd = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isTrue, setisTrue] = useState('');

  const isSuccess = useSelector((state) => state.login?.isSuccess);

  const handleLogin = () => {
    dispatch(forgetPasssowrd({ email }));
    setisTrue(true)

       
      
  };
  if (isSuccess) {
    console.log(isSuccess)

    setisTrue(true)
  }
  useEffect(() => {
    if (isSuccess) {
      setisTrue(true)
    }
  }, [isSuccess]);

  return (
    <div className="login-container">
      <img src={background} alt="" />
      <div className="container">
        <div className="image">
          <span className="PingoWay">Pingoway</span>
          <span className="Welcome">Welcome</span>
        </div>
        {!isTrue && (
          <div className="login">
            <span className="welcom">Welcome Back...</span>
            <div className="inputs">
              <input
                className="user"
                type="text"
                placeholder="enter your Email please .."
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon-user">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            <button className="login-button" onClick={handleLogin}>
              Send
            </button>
          </div>
        )}
        {isTrue && <div className='loginn'>
<span>Check your Email Please</span>
<img src={check} alt="" /><div>

</div>
            
            </div>}
      </div>
    </div>
  );
  
};

export default ForgetPassowrd;
