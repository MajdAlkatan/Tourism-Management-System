import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseurl } from '../../../App';

// Function to get the current language from the store
const getCurrentLanguage = (state) => state.language.currentLanguage;

export const addHotel = createAsyncThunk('hotel/addHotel', async (hotelData, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const currentLanguage = getCurrentLanguage(state); // Get the current language
 
    // Create a FormData object to handle the multipart form data
    const formData = new FormData();
    formData.append('name', hotelData.name);
    formData.append('description', hotelData.description);
    formData.append('type', hotelData.type);
    formData.append('desgen', hotelData.design);
    formData.append('refund_rate', hotelData.refund_rate);
    formData.append('upfront_rate', hotelData.upfront_rate);
    formData.append('points_gift', hotelData.points_gift);
    formData.append('allow_points', hotelData.allow_points);
    formData.append('allow_review', hotelData.allow_review);
    formData.append('star', hotelData.stars);
    formData.append('address.raw', hotelData.address.raw);

    // Append each image file to the form data
    hotelData.images.forEach((image, index) => {
      formData.append(`photos[${index}]image`, image);
    });

    const response = await axios.post(`${baseurl}/services/properties/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept-Language': currentLanguage, // Use the current language from the store
      },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    hotel: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHotel.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addHotel.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hotel = action.payload;
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default hotelSlice.reducer;
