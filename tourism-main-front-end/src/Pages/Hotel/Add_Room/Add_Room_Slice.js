import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseurl } from '../../../App';

export const addRoom = createAsyncThunk(
  'rooms/addRoom',
  async (roomData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      // Adding other fields to formData
      formData.append('property_id', roomData.property_id);
      formData.append('name', roomData.name);
      formData.append('type', roomData.type);
      formData.append('description', roomData.description);
      formData.append('number', roomData.number);
      formData.append('price', roomData.price);
      formData.append('available_start_date', roomData.available_start_date);
      formData.append('available_end_date', roomData.available_end_date);

      if (roomData.multi_night_discount) {
        formData.append('multi_night_discount', roomData.multi_night_discount);
      }
      if (roomData.points_discount) {
        formData.append('points_discount', roomData.points_discount);
      }
      if (roomData.points_discount_price) {
        formData.append('points_discount_price', roomData.points_discount_price);
      }

      // Adding photos to formData
      roomData.photos.forEach((photo, index) => {
        formData.append(`photos[${index}]image`, photo);
      });

      // Adding beds to formData
      roomData.beds.forEach((bed, index) => {
        formData.append(`beds[${index}]number`, bed.number);
        formData.append(`beds[${index}]type`, bed.type);
      });

      const response = await axios.post(
        `${baseurl}/services/properties/sup-properties/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept-Language': 'ar', // Use the current language from the store
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const addRoomSlice = createSlice({
  name: 'rooms',
  initialState: {
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRoom.fulfilled, (state) => {
        state.success = true;
        state.error = null;
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || 'An error occurred while adding the room.';
      });
  },
});

export const { resetState } = addRoomSlice.actions;

export default addRoomSlice.reducer;
