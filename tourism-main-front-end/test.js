import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, thunkAPI) => {
    // Check if email or password is empty
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login/web/", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (res.status === 200) {
        console.log(data);
        return data;
      } else {
        console.log(thunkAPI.rejectWithValue(data));
      }
    } catch (err) {
      console.log(thunkAPI.rejectWithValue(err.response?.data || "Failed to login"));
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null; // Reset error state
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login"; // Set error message
      });
  },
});

export default loginSlice.reducer;
