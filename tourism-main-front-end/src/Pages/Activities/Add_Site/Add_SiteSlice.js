import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../../../App';

export const addSite = createAsyncThunk(
    "sites/addSite",
    async({ name, photo, address, description, route, street }, thunkAPI) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("address.raw", address);
        formData.append("address.route", route);
        formData.append("address.street_number", street);

        formData.append("description", description);
        formData.append("photo", photo);

        console.log(`JWT ${localStorage.getItem("token")}`);

        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }
        try {
            const res = await axios.post(
                `${baseurl}/services/activities/sites/`,
                formData, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = res.data;

            if (res.status === 201) {
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

const SitesSlice = createSlice({
    name: "sites",
    initialState: {
        loading: false,
        sites: [],
        isAuthenticated: false,
        token: null,
    },
    reducers: {
        setTour: (state, action) => {
            state.sites = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSite.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSite.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = localStorage.getItem("token");
                state.sites.push(action.payload);
            })
            .addCase(addSite.rejected, (state, action) => {
                state.loading = false;
                console.error("Failed to add tour:", action.error.message);
            });
    },
});

export const { setSite } = SitesSlice.actions;

export default SitesSlice.reducer;