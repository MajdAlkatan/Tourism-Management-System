import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../../../App';

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (
    {
      name,
      type,
      start_minute,
      start_hour,
      end_minute,
      end_hour,
      start_day_of_week,
      end_day_of_week,
      start_day_of_month,
      end_day_of_month,
      start_month_of_year,
      end_month_of_year,
    },
    thunkAPI
  ) => {
    const formData = new FormData();

    // Append basic fields
    formData.append("name", name);
    formData.append("type", type);
    formData.append("start_minute", start_minute);
    formData.append("start_hour", start_hour);
    formData.append("end_minute", end_minute);
    formData.append("end_hour", end_hour);

    // Append type-specific fields
    if (type === "weekly") {
      if (start_day_of_week) formData.append("start_day_of_week", start_day_of_week);
      if (end_day_of_week) formData.append("end_day_of_week", end_day_of_week);
    } else if (type === "monthly") {
      if (start_day_of_month) formData.append("start_day_of_month", start_day_of_month);
      if (end_day_of_month) formData.append("end_day_of_month", end_day_of_month);
    } else if (type === "yearly") {
      if (start_month_of_year) formData.append("start_month_of_year", start_month_of_year);
      if (end_month_of_year) formData.append("end_month_of_year", end_month_of_year);
    }

    // Log FormData for debugging
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const res = await axios.post(`${baseurl}:8000/events/`, formData, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      });

      if (res.status >= 200 && res.status < 300) {
        console.log(res.data);
        return res.data;
      } else {
        throw new Error(res.data);
      }
    } catch (err) {
      const status = err.response ? err.response.status : "No response";
      const statusText = err.response ? err.response.statusText : "Unknown error";
      console.error(`Status: ${status}, Status Text: ${statusText}`);

      const errorMessage = err.response && err.response.data
        ? err.response.data.message || JSON.stringify(err.response.data)
        : err.message;
      
      // Clean up error message
      const cleanedErrorMessage = errorMessage.replace(/\\|"/g, '');

      console.error(cleanedErrorMessage);

      return thunkAPI.rejectWithValue(cleanedErrorMessage);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    events: [],
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    setEvent: (state, action) => {
      state.events = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = localStorage.getItem("token");
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to add event:", action.payload);
      });
  },
});

export const { setEvent } = eventSlice.actions;

export default eventSlice.reducer;
