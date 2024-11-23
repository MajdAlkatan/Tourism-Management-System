// LoginSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../../App';


export const Search = createAsyncThunk(
    "search/Search",
    async({ type, search, tickets__price__range, tour__duration__range, tour__takeoff_date__range, tour__takeoff_date, tickets__price, tour__duration }, { rejectWithValue }) => {
        try {
            console.log(localStorage.getItem('token'))
            const response = await axios.get(
                `${baseurl}/services/activities/?tour__duration=${tour__duration}&tickets__price=${tickets__price}&tour__takeoff_date=${tour__takeoff_date}&tour__takeoff_date__range=${tour__takeoff_date__range}&tour__duration__range=${tour__duration__range}&tickets__price__range=${tickets__price__range}&type=${type}&search=${search}`, {}, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            if (response.status == 200) {
                console.log(response.data)
                return response.data;

            }

        } catch (error) {
            // Use rejectWithValue to return a custom error object
            return rejectWithValue(error.response.data || 'An unknown error occurred');
        }
    }
);

const SearchSlice = createSlice({
    name: "search",
    initialState: {
        loading: false,
        searcha: [],

    },

    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(Search.pending, (state) => {
                state.loading = true;
            })
            .addCase(Search.fulfilled, (state, action) => {
                state.loading = false;
                state.searcha = action.payload;
            })
            .addCase(Search.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            });
    },
});


export default SearchSlice.reducer;