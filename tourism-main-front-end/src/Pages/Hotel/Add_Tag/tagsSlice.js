// src/store/tagsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseurl } from '../../../App';

// Fetch tags from the API
export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  try {
    const response = await axios.get('${baseurl}/services/properties/property-tags/', {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
});

// Add or update a tag
export const addOrUpdateTag = createAsyncThunk('tags/addOrUpdateTag', async ({ propertyId, tagId }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseurl}/services/properties/property-tags/`, {
      property: propertyId,
      tag: tagId
    }, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding or updating tag:", error);
    return rejectWithValue(error.response.data);
  }
});

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addOrUpdateTag.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrUpdateTag.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally, update the tags list with the new/updated tag
        const updatedTag = action.payload;
        state.tags = state.tags.map(tag =>
          tag.id === updatedTag.id ? updatedTag : tag
        );
      })
      .addCase(addOrUpdateTag.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default tagsSlice.reducer;
