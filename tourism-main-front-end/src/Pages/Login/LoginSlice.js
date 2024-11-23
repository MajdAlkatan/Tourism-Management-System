// LoginSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../../App';

export const loginUser = createAsyncThunk(
    "login/loginUser",
    async({ email, password }, thunkAPI) => {
        const body = JSON.stringify({
            email,
            password,
        });

        try {
            const res = await axios.post(
                `${baseurl}/auth/login/web/`,
                body, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            console.log("Response:", res.data); // This line prints the response data

            const data = res.data;

            if (res.status === 200) {
                localStorage.setItem('token', res.data.access);
                localStorage.setItem('isAuthenticated', true);
                return data;
            } else {
                throw new Error('Login failed');
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || 'An unknown error occurred');
        }
    }
);
export const forgetPasssowrd = createAsyncThunk(
    "forget/forgetPasssowrd",
    async({ email }, thunkAPI) => {
        const body = JSON.stringify({
            email,
        });

        try {
            const res = await axios.post(
                `${baseurl}/auth/users/rese_password/`,
                body, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            console.log("Response:", res.data); // This line prints the response data

            const data = res.data;

            if (res.status === 200) {
                localStorage.setItem('token', res.data.access);
                localStorage.setItem('isAuthenticated', true);
                return data;
            } else {
                throw new Error('Login failed');
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || 'An unknown error occurred');
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
        isSuccess: localStorage.getItem('isSuccess') === 'true' || false,

        loading: false,
        user: null,
        forget: null,
        token: localStorage.getItem('token') || ""

    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isSuccess = !!action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('token');
            })
            .addCase(forgetPasssowrd.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgetPasssowrd.fulfilled, (state, { payload }) => {
                state.token = payload.token;
                state.forget = payload.user;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(forgetPasssowrd.rejected, (state) => {
                state.loading = false;
                state.isSuccess = false;
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('token');
            })
    },
});

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;