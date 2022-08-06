import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: [],
	reducers: {
		toggleFavorite: (faves, action) => {
			// action = { "payload": 1, "type": "favorites/toggleFavorite" }
			// favorites is an array of campsite ids
			console.log('toggleFavorite action:', action);
			console.log('toggleFavorite faves:', faves);
			if(faves.includes(action.payload)) return faves.filter(f => f !== action.payload);
			faves.push(action.payload);
		}
	}
});

export const { toggleFavorite } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
