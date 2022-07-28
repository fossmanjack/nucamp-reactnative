import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/baseURL';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch(baseURL + 'comments');
        return response.json();
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: { isLoading: true, errMess: null, commentsArray: [] },
    reducers: {},
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.commentsArray = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const commentsReducer = commentsSlice.reducer;
