import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseurl } from '../../../App';

// Async thunk for deleting a hotel
export const deleteHotel = createAsyncThunk(
    'hotels/deleteHotel',
    async(hotelId, { rejectWithValue }) => {
        try {
            await axios.delete(`${baseurl}/services/properties/${hotelId}/`);
            return hotelId; // Return the hotelId to remove it from the state
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const HotelPage = createAsyncThunk(
    "hot/HotelPage",
    async(id) => {
        try {
            const response = await axios.get(
                `${baseurl}/services/properties/${id}`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log('Fetched data:', response.data);
            const data = response.data
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    });
export const UpdateHot = createAsyncThunk(
    "update/UpdateHot",
    async({

        name,
        description,
        type,
        desgen,
        refund_rate,
        upfront_rate,
        points_gift,
        allow_points,
        allow_review,
        stars,
        address,
        id,
    }, thunkAPI) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("desgen", desgen);
        formData.append("refund_rate", refund_rate);
        formData.append("upfront_rate", upfront_rate);
        formData.append("points_gift", points_gift);
        formData.append("allow_points", allow_points);
        formData.append("allow_review", allow_review);
        formData.append("star ", stars);
        formData.append("address.raw", address);


        try {
            const res = await axios.patch(
                `${baseurl}/services/properties/${id}/`,
                formData, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = res.data;

            if (res.status === 200) {
                console.log(res.data);
                return data;
            } else {
                throw new Error("Failed to make tour");
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.error(
                    `Status: ${err.response.status}, Status Text: ${err.response.statusText}`
                );
                console.error(err.response.data);
            } else {
                const errorMessage =
                    err.response && err.response.data ?
                    err.response.data.message :
                    err.message;
                console.error(errorMessage);
            }
            return thunkAPI.rejectWithValue("error");
        }
    }
);

const hotelDeleteSlice = createSlice({
    name: 'deletehotel',
    initialState: {
        hotels: [],
        hot: [],
        update: [], // Stores the list of hotels
        loading: false, // Loading state for the delete operation
        error: null, // Error state for the delete operation
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteHotel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.hotels = state.hotels.filter(hotel => hotel.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteHotel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(HotelPage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(HotelPage.fulfilled, (state, action) => {
                state.loading = false;
                state.hot = action.payload;
                state.error = null;
            })
            .addCase(HotelPage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UpdateHot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateHot.fulfilled, (state, action) => {
                state.loading = false;
                state.update = action.payload;

            })
            .addCase(UpdateHot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export default hotelDeleteSlice.reducer;