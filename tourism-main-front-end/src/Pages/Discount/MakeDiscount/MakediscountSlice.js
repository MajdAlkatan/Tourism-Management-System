// MakediscountSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseurl } from '../../../App';

// Define an asynchronous thunk action
export const createDiscount = createAsyncThunk(
  'discount/createDiscount',
  async ({ service, event, percent }, { rejectWithValue }) => {
    try {
      // Ensure at least one of service or event is provided
      if (!service && !event) {
        throw new Error("Either 'service' or 'event' must be provided");
      }

      // Retrieve JWT token from local storage
      const token = localStorage.getItem('token');
      
      const response = await axios.post(`${baseurl}/services/service-discounts/`, {
        service,
        event,
        percent,
      }, {
        headers: {
          'Authorization': `JWT ${token}`, // Include the token in the Authorization header
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const makediscountSlice = createSlice({
  name: 'discount',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default makediscountSlice.reducer;
