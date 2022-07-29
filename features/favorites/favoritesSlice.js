import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: [],
	reducers: {
		toggleFavorite: (faves, action) => {
			if(faves.includes(action.payload)) return faves.filter(f => f !== action.payload);
			faves.push(action.payload);
		}
	}
});

export const { toggleFavorite } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
