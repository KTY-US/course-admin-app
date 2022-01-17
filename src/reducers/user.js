import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
	isLoading: true,
	users: [],
	total: 0
};

const userSlice = createSlice({
	name: 'auth',
	initialState: initialUserState,
	reducers: {
		changeIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		storeUsers(state, action) {
			state.users = action.payload.users;
			state.total = action.payload.total;
		}
	}
});

export const userActions = userSlice.actions;

export default userSlice;
