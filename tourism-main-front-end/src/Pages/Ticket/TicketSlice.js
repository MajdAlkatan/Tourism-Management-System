import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../../App';

export const addTicket = createAsyncThunk(
    "ticket/addTicket",
    async({
            price,
            description,
            name,
            stock,
            pointsDiscount,
            validuntil,
            pointsDiscountPrice,
            id,
            pricecurrency
        },
        thunkAPI
    ) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("price", price);
        formData.append("valid_until", validuntil);
        formData.append("description", description);
        formData.append("stock", stock);
        formData.append("points_discount_price", pointsDiscountPrice);
        formData.append("points_discount", pointsDiscount);
        formData.append("price_currency", pricecurrency);

        console.log(`JWT ${localStorage.getItem("token")}`);

        try {
            const res = await axios.post(
                `${baseurl}/services/activities/${id}/tickets/`,
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
export const CurrencyPage = createAsyncThunk(
    'currency/CurrencyPage',
    async() => {
        try {
            const response = await axios.get(`${baseurl}/exchange_rates/`, {
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
const TicketSlice = createSlice({
    name: "ticket",
    initialState: {
        ticket: [],
        currency: [],
        tagsData: [],
        category: [],
        tags: [],
        addTags: [],
        Deletecat: [],
        loading: false,
        error: null,
        token: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTicket.pending, (state, action) => {
                console.log(action);
                state.loading = true;
            })
            .addCase(addTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.ticket = action.payload;
            })
            .addCase(addTicket.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            })
            .addCase(CurrencyPage.pending, (state, action) => {
                console.log(action);
                state.loading = true;
            })
            .addCase(CurrencyPage.fulfilled, (state, action) => {
                state.loading = false;
                state.currency = action.payload;
            })
            .addCase(CurrencyPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            })
    },
});

export default TicketSlice.reducer;