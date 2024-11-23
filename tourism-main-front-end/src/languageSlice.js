// src/store/languageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLanguage: localStorage.getItem('currentLanguage') || 'ar', // Default language
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      localStorage.setItem('currentLanguage', action.payload); // Persist to localStorage
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
