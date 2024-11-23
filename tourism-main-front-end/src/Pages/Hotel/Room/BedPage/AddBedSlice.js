import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseurl } from '../../../../App';

// Async thunk to handle the API request
export const addBed = createAsyncThunk(
  'addBed',
  async ({ supPropertyId, bedType, number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/services/properties/sup-property-beds/`, {
        supproperty: supPropertyId,  // Room ID (ensure the field name matches what the API expects)
        type: bedType,                // Bed Type
        number: number                // Number of beds
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      console.error('API Error:', error.response.data); // Logging the error for debugging
      return rejectWithValue(error.response.data);
    }
  }
);

const addBedSlice = createSlice({
  name: 'addBed',
  initialState: {
    loading: false,
    bed: null,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.bed = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBed.fulfilled, (state, action) => {
        state.loading = false;
        state.bed = action.payload;
      })
      .addCase(addBed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  }
});

export const { resetState } = addBedSlice.actions;

export default addBedSlice.reducer;
