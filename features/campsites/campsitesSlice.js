import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/baseURL';

export const fetchCampsites = createAsyncThunk(
    'campsites/fetchCampsites',
    async () => {
        const response = await fetch(baseURL + 'campsites');
        return response.json();
    }
);

const campsitesSlice = createSlice({
    name: 'campsites',
    initialState: { isLoading: true, errMess: null, campsitesArray: [] },
    reducers: {},
    extraReducers: {
        [fetchCampsites.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchCampsites.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.campsitesArray = action.payload;
        },
        [fetchCampsites.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const campsitesReducer = campsitesSlice.reducer;
