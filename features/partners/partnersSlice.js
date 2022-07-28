import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/baseURL';

export const fetchPartners = createAsyncThunk(
    'partners/fetchPartners',
    async () => {
        const response = await fetch(baseURL + 'partners');
        return response.json();
    }
);

const partnersSlice = createSlice({
    name: 'partners',
    initialState: { isLoading: true, errMess: null, partnersArray: [] },
    reducers: {},
    extraReducers: {
        [fetchPartners.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchPartners.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.partnersArray = action.payload;
        },
        [fetchPartners.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const partnersReducer = partnersSlice.reducer;
