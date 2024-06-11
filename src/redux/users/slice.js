import { createSlice } from '@reduxjs/toolkit';
import { editUserInfo } from './operation';

const slice = createSlice({
	name: 'users',
	initialState: {
		user: {
			name: '',
			email: '',
			password: '',
			avatarUrl: '',
		},
		token: null,
	},
	extraReducers: builder =>
		builder.addCase(editUserInfo.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		}),
});

export default slice.reducer;
