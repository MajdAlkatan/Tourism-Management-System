import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from '../../App';

export const ServicesPage = createAsyncThunk(
    'service/ServicesPage',
    async() => {
        try {
            const response = await axios.get(`${baseurl}/tags/categories/`, {
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
export const CategoryPage = createAsyncThunk(
    'category/CategoryPage',

    async({ name, type }, thunkAPI) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("type", type);


        try {
            const response = await axios.post(`${baseurl}/tags/categories/`,
                formData, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    }

                });
            const data = response.data;

            if (response.status === 201) {
                console.log(response.data);
                return data;
            } else {
                throw new Error('Failed to make tour');
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
export const AddTagsPage = createAsyncThunk(
    'tags/AddTagsPage',

    async({ name, contenttype, category }, thunkAPI) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("contenttype", contenttype);
        formData.append("category", category);



        try {
            const response = await axios.post(`${baseurl}/tags/`,
                formData, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    }

                });
            const data = response.data;

            if (response.status === 201) {
                console.log(response.data);
                return data;
            } else {
                throw new Error('Failed to make tour');
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
export const TagsPage = createAsyncThunk(
    'tag/TagsPage',
    async() => {
        try {
            const response = await axios.get(`${baseurl}/tags/`, {
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
export const DeleteCategory = createAsyncThunk(
    'Deletecat/DeleteCategory',
    async(id) => {
        try {
            const response = await axios.delete(`${baseurl}/tags/categories/${id}/`, {
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
export const DeleteTag = createAsyncThunk(
    'Deletetag/DeleteTag',
    async(id) => {
        try {
            const response = await axios.delete(`${baseurl}/tags/${id}/`, {
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
const ServicesSlice = createSlice({
    name: "services",
    initialState: {
        servicesData: [],
        tagsData: [],
        category: [],
        tags: [],
        addTags: [],
        Deletecat: [],
        loading: false,
        error: null,
        token: null,
        success: false,

    },
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(ServicesPage.pending, (state, action) => {
                console.log(action);
                state.loading = true;
            })
            .addCase(ServicesPage.fulfilled, (state, action) => {
                state.loading = false;
                state.servicesData = action.payload;
            })
            .addCase(ServicesPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            })
            .addCase(TagsPage.pending, (state, action) => {
                console.log(action);
                state.loading = true;

            })
            .addCase(TagsPage.fulfilled, (state, action) => {
                state.loading = false;
                state.tagsData = action.payload;

            })
            .addCase(TagsPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";


            })
            .addCase(CategoryPage.pending, (state, action) => {
                console.log(action)
                state.loading = true;
                state.success = false
            })

        .addCase(CategoryPage.fulfilled, (state, action) => {
                state.loading = false;

                state.category = action.payload;

                state.success = true;

            })
            .addCase(CategoryPage.rejected, (state, action) => {
                state.loading = false;
                state.error = "Error fetching data";
                state.success = false;
                state.error = action.payload.error;


            })

        .addCase(AddTagsPage.pending, (state, action) => {
                console.log(action)
                state.loading = true;
                state.success = false;

            })
            .addCase(AddTagsPage.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;


                state.tags = action.payload;
            })
            .addCase(AddTagsPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
                state.success = false;

            })
            .addCase(DeleteCategory.pending, (state, action) => {
                console.log(action)
                state.loading = true;
            })
            .addCase(DeleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.token = localStorage.getItem('token');
                state.Deletecat.push(action.payload);
            })
            .addCase(DeleteCategory.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            })

    },
});

export const { setcategory } = ServicesSlice.actions;
export const { resetSuccess } = ServicesSlice.actions;


export default ServicesSlice.reducer;