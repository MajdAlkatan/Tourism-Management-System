import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../../../App';

export const addTour = createAsyncThunk(
    "tours/addTour",
    async({ name, photos, duration, refund_rate, description, points_gift, allow_points, guid_id, takeoff_date }, thunkAPI) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("duration", duration);
        formData.append("refund_rate", refund_rate);
        formData.append("description", description);
        formData.append("allow_points", allow_points);
        formData.append("guide_id", guid_id);
        formData.append("takeoff_date", takeoff_date);
        formData.append("points_gift", points_gift);

        photos.forEach((photo, index) => {
            formData.append(`photos[${index}]image`, photo);
        });






        console.log(`JWT ${localStorage.getItem('token')}`)



        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        try {
            const res = await axios.post(
                `${baseurl}/services/activities/tours/`,
                formData, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,


                    },

                }
            );

            const data = res.data;

            if (res.status === 201) {
                console.log(res.data);
                return data;
            } else {
                throw new Error('Failed to make tour');
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.error(`Status: ${err.response.status}, Status Text: ${err.response.statusText}`);
                console.error(err.response.data);
            } else {
                const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
                console.error(errorMessage);
            }
            return thunkAPI.rejectWithValue('error');
        }
    });


export const Listing = createAsyncThunk(
    "listing/Listing",
    async({
        name,
        photos,

        refund_rate,
        description,
        allow_points,
        points_gift,
        site_id,
        time,
        Website,
        work_hours
    }, thunkAPI) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("site_id", site_id);
        formData.append("refund_rate", refund_rate);
        formData.append("description", description);
        formData.append("allow_points", allow_points);
        formData.append("website", Website);
        formData.append("work_hours", work_hours);
        formData.append("opens_at", time);
        formData.append("points_gift", points_gift);

        photos.forEach((photo, index) => {
            formData.append(`photos[${index}]image`, photo);
        });






        console.log(`JWT ${localStorage.getItem('token')}`)



        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        try {
            const res = await axios.post(
                `http://192.168.73.195:8000/services/activities/listings/`,
                formData, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,


                    },

                }
            );

            const data = res.data;

            if (res.status === 201) {
                console.log(res.data);
                return data;
            } else {
                throw new Error('Failed to make tour');
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.error(`Status: ${err.response.status}, Status Text: ${err.response.statusText}`);
                console.error(err.response.data);
            } else {
                const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
                console.error(errorMessage);
            }
            return thunkAPI.rejectWithValue('error');
        }
    });


const TourSlice = createSlice({
    name: "tours",
    initialState: {
        loading: false,
        tours: [],
        listing: [],
        isAuthenticated: false,
        token: null,
        success: false,
    },
    reducers: {
        setTour: (state, action) => {
            state.tours = action.payload;
            state.isAuthenticated = true;
            state.success = false
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(addTour.pending, (state) => {
                state.loading = true;
                state.success = false

            })
            .addCase(addTour.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = localStorage.getItem('token');
                state.tours = action.payload;
                state.success = true

            })
            .addCase(addTour.rejected, (state, action) => {
                state.loading = false;
                console.error('Failed to add tour:', action.error.message);
                state.success = false


            });
    },
});

export const { setTour } = TourSlice.actions;

export default TourSlice.reducer;