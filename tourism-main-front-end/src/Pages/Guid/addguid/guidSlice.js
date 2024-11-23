import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../../../App';

export const addguid = createAsyncThunk(
  "Guid/addguid",
  async ({ name, avatar, email, bio }, thunkAPI) => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("avatar", avatar);

    console.log(`JWT ${localStorage.getItem("token")}`);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const res = await axios.post(
        `${baseurl}/services/activities/guides/`,
        formData,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = res.data;

      if (
        res.status === 200 ||
        res.status === 201 ||
        res.status === 202 ||
        res.status === 204
      ) {
        console.log(res.data);
        return data;
      } else {
        throw new Error(res.data);
      }
    } catch (err) {
      if (
        (err.response && err.response.status === 400) ||
        (err.response && err.response.status === 402) ||
        (err.response && err.response.status === 403) ||
        (err.response && err.response.status === 404)
      ) {
        console.error(
          `Status: ${err.response.status}, Status Text: ${err.response.statusText}`
        );
        console.error(err.response.data);
      } else {
        const errorMessage =
          err.response && err.response.data
            ? err.response.data.message
            : err.message;
        console.error(errorMessage);
      }
      return thunkAPI.rejectWithValue("error");
    }
  }
);

const guidSlice = createSlice({

  name: "Guid",
  initialState: {
    loading: false,
    guid: [],
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    
    setGuid: (state, action) => {
      state.sites = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addguid.pending, (state) => {
        state.loading = true;
      })
      .addCase(addguid.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = localStorage.getItem("token");
        state.sites.push(action.payload);
      })
      .addCase(addguid.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to add Guid:", action.error.message);
      });
  },
});

export const { setSite } = guidSlice.actions;

export default guidSlice.reducer;
