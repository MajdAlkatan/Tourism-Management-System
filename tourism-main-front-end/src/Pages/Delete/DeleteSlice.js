import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../../App';

export const Cancel = createAsyncThunk(
    "cancel/Cancel",
    async(id) => {
        try {
            const res = await axios.post(
                `${baseurl}/services/activities/${id}/cancel/`, {}, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                }
            );



            if (res.status === 200) {
                console.log(res.data);
                return res.data;
            } else if (res.status === 400) {
                console.log(res.data)
                return res.data
            } else {
                throw new Error("Failed to make tour");
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                console.error(
                    `Status: ${err.response.status}, Status Text: ${err.response.statusText}`
                );
                console.error(err.response.data);
                // Optionally, redirect the user to login page or show a message
            } else if (err.response && err.response.status === 400) {
                console.error(
                    `Status: ${err.response.status}, Status Text: ${err.response.statusText}`
                );
                console.error(err.response.data);
                return (err.response.data);

            } else if (err.response && err.response.status === 405) {
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
            return "error";
        }
    });

export const Refund = createAsyncThunk("refund/Refund", async(id) => {
    try {
        const res = await axios.post(
            `${baseurl}/services/activities/${id}/refund_all/`, {}, {
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
        return "error";
    }
});
export const Delete = createAsyncThunk("delete/Delete", async(id) => {
    try {
        const res = await axios.delete(
            `${baseurl}/services/activities/${id}/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("token")}`,
                },
            }
        );

        const data = res.data;

        if (res.status === 204) {
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
        return "error";
    }
});
const DeleteSlice = createSlice({
    name: "delete",
    initialState: {
        loading: false,
        cancel: [],
        refund: [],
        delete: [],
        token: null,
        isCancelled: true,
        isRefund: false,
        isDelete: false,


    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(Cancel.pending, (state) => {
                state.loading = true;
                state.isCancelled = false;

            })
            .addCase(Cancel.fulfilled, (state, action) => {
                state.loading = false;
                state.cancel.push(action.payload);
                console.log(state.cancel);
                state.isRefund = true;
            })

        .addCase(Cancel.rejected, (state, action) => {
                state.loading = false;
                console.error("Failed to add tour:", action.error.message);
                state.isCancelled = false;

            })
            .addCase(Refund.pending, (state) => {
                state.loading = true;
                state.isRefund = false;

            })
            .addCase(Refund.fulfilled, (state, action) => {
                state.loading = false;
                state.refund.push(action.payload);
                state.isDelete = true;


            })
            .addCase(Refund.rejected, (state, action) => {
                state.loading = false;
                console.error("Failed to add tour:", action.error.message);
                state.isRefund = false;
            })
            .addCase(Delete.pending, (state) => {
                state.loading = true;
            })
            .addCase(Delete.fulfilled, (state, action) => {
                state.loading = false;
                state.delete.push(action.payload);

            })
            .addCase(Delete.rejected, (state, action) => {
                state.loading = false;
                console.error("Failed to add tour:", action.error.message);
            });
    },
});

export default DeleteSlice.reducer;