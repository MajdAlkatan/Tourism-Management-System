import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../../../App';

export const ActivitesPage = createAsyncThunk(
    'activites/ActivitesPage',
    async() => {
        try {
            const response = await axios.get(`${baseurl}/services/activities/sites/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            });
            const data = response.data;
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
);
export const ToursPage = createAsyncThunk(
    'tours/ToursPage',
    async() => {
        try {
            const response = await axios.get(`${baseurl}/services/activities/tours/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            });
            const data = response.data;
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
);

const ActivitesSlice = createSlice({
    name: "activites",
    initialState: {
        data: [],
        tours: [],
        loading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(ActivitesPage.pending, (state) => {
                state.loading = true;
            })
            .addCase(ActivitesPage.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(ActivitesPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            })
            .addCase(ToursPage.pending, (state) => {
                state.loading = true;
            })
            .addCase(ToursPage.fulfilled, (state, action) => {
                state.loading = false;
                state.tours = action.payload;
            })
            .addCase(ToursPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            });

    },
});


export default ActivitesSlice.reducer;