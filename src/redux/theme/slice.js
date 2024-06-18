import { createSlice } from '@reduxjs/toolkit';
import { changeTheme } from './operations';
import { logOut } from '../auth/operations';

const slice = createSlice({
	name: 'theme',
	initialState: { value: 'dark' },
	extraReducers: builder =>
		builder
			.addCase(changeTheme.fulfilled, (state, action) => {
				state.value = action.payload.theme;
			})
			.addCase(logOut.fulfilled, state => {
				state.value = 'dark';
			}),
});

export default slice.reducer;
