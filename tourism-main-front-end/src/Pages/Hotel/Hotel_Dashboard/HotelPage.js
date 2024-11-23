import axios from 'axios';
import { baseurl } from '../../../App';

// Action Types
const FETCH_HOTELS_REQUEST = 'FETCH_HOTELS_REQUEST';
const FETCH_HOTELS_SUCCESS = 'FETCH_HOTELS_SUCCESS';
const FETCH_HOTELS_FAILURE = 'FETCH_HOTELS_FAILURE';

// Initial State
const initialState = {
  loading: false,
  data: [],
  error: '',
};

// Reducer
const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOTELS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_HOTELS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    case FETCH_HOTELS_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// Action Creators
const fetchHotelsRequest = () => ({
  type: FETCH_HOTELS_REQUEST,
});

const fetchHotelsSuccess = (hotels) => ({
  type: FETCH_HOTELS_SUCCESS,
  payload: hotels,
});

const fetchHotelsFailure = (error) => ({
  type: FETCH_HOTELS_FAILURE,
  payload: error,
});

// Async Thunk Action (using Redux Thunk)
export const fetchHotels = () => {
  return async (dispatch, getState) => {
    dispatch(fetchHotelsRequest());
    try {
      const state = getState();
      const currentLanguage = state.language.currentLanguage; // Adjust according to your state structure

      const response = await axios.get(`${baseurl}/services/properties/`, {
        headers: {
          'Accept-Language': currentLanguage, // Use the correct header name
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Example for authorization header
        },
      });
      dispatch(fetchHotelsSuccess(response.data.results));
    } catch (error) {
      dispatch(fetchHotelsFailure(error.message));
    }
  };
};

export default hotelReducer;
